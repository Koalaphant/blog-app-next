import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "USER" | "ADMIN";
  }

  interface Session {
    id: string;
    role: "USER" | "ADMIN";
  }
}