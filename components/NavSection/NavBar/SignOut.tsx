"use client";

import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button
      className="ml-8 bg-slate-50 px-3 py-2 rounded-sm cursor-pointer text-red-800 font-bold"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
    >
      Sign Out
    </button>
  );
};

export default SignOut;
