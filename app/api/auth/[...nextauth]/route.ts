import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // Adjust path to your Prisma client
import { compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find admin by email
        const admin = await prisma.admin.findUnique({
          where: { email: credentials?.email },
        });

        if (!admin) {
          throw new Error("No user found");
        }

        // Validate password
        const isValid = await compare(credentials?.password, admin.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return { id: admin.id, email: admin.email }; // Add necessary fields for session
      },
    }),
  ],
  pages: {
    signIn: '/auth/login', // Custom login page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is in your .env file
});

export { handler as GET, handler as POST };