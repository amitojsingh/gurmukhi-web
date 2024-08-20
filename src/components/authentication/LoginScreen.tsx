"use client";

import { CustomHeader, SpeechBubble } from "@/components/common";
import { SignInWithGoogleButton } from "@/components/authentication";
import { useState } from "react";

const LoginScreen: React.FC = () => {
  const [isSignUp, setSignUp] = useState(false);

  return (
    <>
      <CustomHeader className="login-header" />
      <section className="flex justify-around items-center grow">
        <SpeechBubble />
        <div className="auth-form flex flex-col justify-center items-center">
          <h3 className="form-welcome-text">Welcome</h3>
          <p className="form-welcome-tagline">Please enter your details</p>
          <div className="form-options">
            <button
              className={!isSignUp ? "active" : ""}
              onClick={() => isSignUp && setSignUp(false)}
            >
              Sign In
            </button>
            <button
              className={isSignUp ? "active" : ""}
              onClick={() => !isSignUp && setSignUp(true)}
            >
              Sign Up
            </button>
          </div>
          <form>
            {isSignUp && (
              <input
                className="input-with-icon"
                type="text"
                placeholder="Name"
                required
              />
            )}
            <input
              className="input-with-icon"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="input-with-icon"
              type="password"
              placeholder="Password"
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}"
              title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
              required
            />
            {isSignUp && (
              <input
                className="input-with-icon"
                type="password"
                placeholder="Confirm Password"
                required
              />
            )}
            <button className="blue-primary-button">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <div className="flex justify-center items-center w-2/3 m-4">
            <hr className="grow mr-2 opacity-30"></hr>
            <p className="opacity-30 font text-xs">OR</p>
            <hr className="grow ml-2 opacity-30"></hr>
          </div>

          <SignInWithGoogleButton className="white-secondary-button" />
        </div>
      </section>
    </>
  );
};

export default LoginScreen;
