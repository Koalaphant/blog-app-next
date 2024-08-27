import React from "react";
import RecentPosts from "@/components/Blog Section/RecentPosts";
import Link from "next/link";
import Image from "next/image";
import FixtureSection from "@/components/FixtureSection/FixtureSection";

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
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="w-full xl:flex-[4.5] bg-red-300 relative h-[300px] md:h-[400px] xl:h-[500px]">
          {" "}
          {/* Responsive height */}
          <Image
            src={data[0].featured_image_url}
            layout="fill"
            objectFit="cover"
            alt={data[0].title}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white text-lg md:text-2xl font-bold w-full md:w-3/4">
            {data[0].title}
          </div>
        </div>
        <div className="w-full xl:flex-[1.5] bg-slate-950 h-[200px] md:h-[300px] xl:h-auto">
          {" "}
          {/* Responsive height */}
          <FixtureSection />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 lg:px-0 mt-5">
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
