"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-red-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form className="flex flex-col space-y-6">
          <div>
            <label className="text-white block text-sm font-semibold mb-2">
              Email:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              type="email"
              placeholder="Enter your email"
              onChange={handleEmail}
              value={email}
            />
          </div>

          <div>
            <label className="text-white block text-sm font-semibold mb-2">
              Password:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              type="password"
              placeholder="Enter your password"
              onChange={handlePassword}
              value={password}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
