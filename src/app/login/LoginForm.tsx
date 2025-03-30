"use client";
import { useLogin } from "@/hooks/useLogin";
import React, { useRef } from "react";

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex flex-col w-2/3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <span className="font-montserrat font-semibold text-[36px] text-black">
          Welcome to Avara
        </span>
        <span className="font-montserrat font-medium text-[24px] text-black opacity-40">
          Complete Login
        </span>

        <input
          className="border border-gray-400 rounded-md pl-2 py-2.5"
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
        <input
          className="border border-gray-400 rounded-md pl-2 py-2.5"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />

        {loginMutation.isError && (
          <div className="text-red-500 text-sm font-medium">
            Invalid email or password.
          </div>
        )}

        <button
          className={`bg-[#ABD1F5] text-black rounded-md py-3 ${
            loginMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
