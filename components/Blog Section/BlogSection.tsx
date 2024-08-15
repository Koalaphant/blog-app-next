import React from "react";
import { fetchPosts } from "@/lib/fetchPosts";
import BlogCard from "../Blog Card/BlogCard";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  like_rating: number;
  featured_image_url: string;
}

export default async function BlogSection() {
  const data: Post[] = await fetchPosts();

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((post: Post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </section>
  );
}
