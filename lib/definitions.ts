import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type User = {
  id: number;
  createdAt: Date;
  email: string;
  username: string;
  password: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  posts: Post[];
};

export type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;
  content: string;
  featured_image_url?: string;
  like_rating: number;
  author?: User;
  authorId?: number;
};

export type Role = 'USER' | 'ADMIN';

export const RoleEnum: { [key in Role]: Role } = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export default prisma;