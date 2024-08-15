import React from "react";
import { fetchUsers } from "@/lib/fetchUsers";
import BlogCard from "../Blog Card/BlogCard";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default async function BlogSection() {
  const data: Post[] = await fetchUsers();

  return (
    <section className="grid grid-cols-2 gap-4">
      {data.map((post: Post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </section>
  );
}
