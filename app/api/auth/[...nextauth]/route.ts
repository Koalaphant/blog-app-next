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
        if (!credentials?.email || typeof credentials.email !== 'string') {
          throw new Error("Email is required");
        }
        if (!credentials?.password || typeof credentials.password !== 'string') {
          throw new Error("Password is required");
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        // Validate password
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Check if the user is an admin
        if (user.role !== 'ADMIN') {
          throw new Error("Not authorized");
        }

        // Return the user object with an id of type string (NextAuth expects id as a string)
        return { id: String(user.id), email: user.email, role: user.role };
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
        session.id = token.sub as string; 
        session.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role; 
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };