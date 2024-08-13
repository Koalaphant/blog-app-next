// app/prismatest/page.tsx

import { PrismaClient } from "@prisma/client";
import React from "react";

const prisma = new PrismaClient();

export default async function Page() {
  const posts = await prisma.post.findMany();

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
