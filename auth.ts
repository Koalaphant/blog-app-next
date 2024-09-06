import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


interface NextAuthUser {
  id: string; 
  createdAt: Date;
  email: string;
  username: string;
  password: string;
  name?: string;
  role: string;
  posts: any[];
}

async function getUser(email: string): Promise<NextAuthUser | undefined> {
  try {
    const prismaUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!prismaUser) return undefined;

    
    const user: NextAuthUser = {
      id: prismaUser.id.toString(), 
      createdAt: prismaUser.createdAt,
      email: prismaUser.email,
      username: prismaUser.username,
      password: prismaUser.password,
      name: prismaUser.name ?? undefined,
      role: prismaUser.role,
      posts: [], 
    };

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user');
  }
}

export const {auth, signIn, signOut} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid Credentials');
        return null;
      },
    }),
  ],
});