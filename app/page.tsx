import React from "react";
import RecentPosts from "@/components/Blog Section/RecentPosts";
import Link from "next/link";
import Image from "next/image";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  like_rating: number;
  featured_image_url: string;
}

// Function to fetch posts
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

// Main page component
export default async function Page() {
  const data: Post[] = await fetchPosts();

  return (
    <div className="max-w-6xl mx-auto my-10 grid gap-5">
      <div className="grid grid-cols-5">
        <div className="col-span-4 bg-red-300 relative w-full h-96">
          <Image
            src={data[0].featured_image_url}
            layout="fill"
            objectFit="cover"
            alt={data[0].title}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white text-2xl font-bold w-1/2">
            {data[0].title}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {data.slice(1).map((post) => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <RecentPosts post={post} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
