"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";

import { auth, signInWithGoogle, signOut } from "@/lib/firebase";
import { CustomUser } from "@/components/authentication";
import { UserCredential } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextProps {
  currentUser: CustomUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CustomUser | null>>;
  signInWithGoogle: () => Promise<UserCredential | undefined>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && currentUser === null) {
        const { uid, email, displayName, emailVerified, photoURL } = user;
        const token = await user.getIdToken();

        if (!email) {
          throw new Error("Unable to get email from this Google account");
        }

        const userRequest = await fetch(`/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            email,
            displayName,
            emailVerified,
            photoURL,
            token,
          }),
        });
        const { userData } = await userRequest.json();
        if (!userData) {
          console.error("Error signing in user");
        } else if (currentUser !== userData) {
          setCurrentUser(userData);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
   // Disabling this rule because we only want to run this effect to run once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser !== null && pathname === "/login") {
      router.push("/dashboard");
    }
  }, [currentUser, pathname, router]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
