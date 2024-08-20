import { shabadavaliDb, usersCollection } from '@/lib/firebase';
import { Timestamp, doc, documentId, getDocs, query, setDoc, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { uid, email, displayName, emailVerified, photoURL, token } = await req.json();
    try {
        const queryStatement = query(
            usersCollection,
            where(documentId(), '==', uid),
            where('email', '==', email)
        );
        const usersSnapshot = await getDocs(queryStatement);
        let userData;
        if (usersSnapshot.empty) {
            const newUser = doc(shabadavaliDb, `users/${uid}`);
            userData = {
                role: 'student',
                email,
                coins: 0,
                progress: {
                    currentProgress: 0,
                    gameSession: [],
                    currentLevel: 0,
                },
                displayName: displayName || email,
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
                emailVerified,
                photoURL: photoURL || '',
                uid,
                wordIds: [],
                lastLoginAt: Timestamp.now(),
            }
            await setDoc(newUser, userData);
        } else {
            userData = usersSnapshot.docs[0].data();
        }
        return NextResponse.json({ userData }, {
            headers: {
                'Set-Cookie': 'authToken=' + token + '; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800',
            }
        });
    } catch(error) {
      console.error("Error querying user:", error);
      return NextResponse.json({ error: "Error querying user" });
    }
};
