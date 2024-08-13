"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  label: string;
  href: string;
}

export default function NavLink({ label, href }: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-2 ${
        isActive ? "text-white bg-blue-500" : "text-blue-700"
      }`}
    >
      {label}
    </Link>
  );
}
