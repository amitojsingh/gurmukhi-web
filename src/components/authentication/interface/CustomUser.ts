import { Timestamp } from "firebase/firestore";

export interface CustomUser {
    role: string;
    email: string;
    coins: number;
    progress: {
        currentProgress: number;
        gameSession: string[];
        currentLevel: number;
    };
    displayName: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    emailVerified: boolean;
    photoURL: string;
    uid: string;
    wordIds: string[];
    lastLoginAt: Timestamp;
}
