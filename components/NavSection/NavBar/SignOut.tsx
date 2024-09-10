'use client'

import { signOut } from "next-auth/react";

const SignOut = () => {
  return ( <h2 onClick={() => signOut({
    redirect: true,
    callbackUrl: `${window.location.origin}/sign-in`,
  })}>Sign Out</h2>)
}

export default SignOut;