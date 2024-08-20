'use client'

import React from 'react';
import { useAuth } from '@/components/authentication';
import { useRouter } from 'next/navigation';

const SignOutButton: React.FC = () => {
    const { signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            await fetch("/api/logout", {
              method: "POST",
            });
            router.push('/login');
        } catch (error) {
            console.error('error signing out with google', error);
        }
    };

    return (
        <button className='white-secondary-button' onClick={handleSignOut}>Sign Out</button>
    );
}

export default SignOutButton;
