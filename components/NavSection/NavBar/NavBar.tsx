import React from "react";
import NavLink from "../NavLinks/NavLinks"; // Make sure to adjust the path as needed
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import SignOut from "./SignOut";

export default async function NavBar() {

  const session = await getServerSession(authOptions)

  const links = [
    { label: "Home", href: "/" },
    { label: "Posts", href: "/posts" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-red-800 flex flex-col items-center justify-center py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-10 border-b-4 border-yellow-300">
      <div className="flex justify-center items-center gap-3 lg:gap-2">
        <Link href="/">
          <img
            src="/lfc-logo.svg"
            alt="Logo"
            className="mb-4 sm:mb-0 w-[50px]"
          />
        </Link>
        <Link href="/">
          <h1 className="text-4xl text-white">
            <span className="font-extrabold">LFC</span>Blog
          </h1>
        </Link>
      </div>
      <div className="flex space-x-4">
        {links.map((link) => (
          <NavLink key={link.label} label={link.label} href={link.href} />
        ))}
      </div>
      {session?.user ? (
        <SignOut/>
      ) : (
      null
      )}
    </nav>
  );
}
