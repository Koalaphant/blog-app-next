import React from "react";
import NavLink from "../NavLinks/NavLinks"; // Make sure to adjust the path as needed

export default function NavBar() {
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-orange-300 flex flex-col items-center justify-center py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <img
        src="https://placehold.co/100x50"
        alt="Logo"
        className="mb-4 sm:mb-0 sm:mr-4"
      />
      <div className="flex space-x-4">
        {links.map((link) => (
          <NavLink key={link.label} label={link.label} href={link.href} />
        ))}
      </div>
    </nav>
  );
}
