import RecentPosts from "@/components/Blog Section/RecentPosts";
import React from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  like_rating: number;
  featured_image_url: string;
}

async function fetchPosts() {
  const response = await fetch("http://localhost:3000/api/posts", {
    next: { revalidate: 5 },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export default async function page() {
  const data: Post[] = await fetchPosts();
  return (
    <div className="max-w-6xl mx-auto my-20">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-5 md:gap-y-10 md:gap-x-10 mb-10">
        {data.map((post) => (
          <RecentPosts key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
