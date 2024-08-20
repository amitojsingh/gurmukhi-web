'use client'

import React, { useState } from 'react';
import { useAuth } from '@/components/authentication';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SignInWithGoogleButtonProps {
    className?: string;
}

const SignInWithGoogleButton: React.FC<SignInWithGoogleButtonProps> = ({className}) => {
    const { signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSignin = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('error login with google', error);
        }
    };

    return (
      <button className={`flex justify-center items-center ${className}`} onClick={handleSignin}>
        <Image src={loading ? "/images/bouncing-circles.svg" : "/images/google.svg"} className="pr-2" alt="google" width={18} height={18} />
        <span>Sign in with Google</span>
      </button>
    );
}

export default SignInWithGoogleButton;
