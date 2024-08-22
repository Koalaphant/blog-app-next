import React from "react";
import { truncateString } from "@/lib/truncateString";
import RecentPosts from "@/components/Blog Section/RecentPosts";
import { formatDate } from "@/utils/dateFormat";
import FixtureSection from "@/components/FixtureSection/FixtureSection";
import Link from "next/link";

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

export default async function Page() {
  const data: Post[] = await fetchPosts();
  return (
    <div className="my-10 mx-4 lg:mx-10">
      <div className="container mx-auto max-w-full lg:max-w-8xl">
        <div className="grid grid-cols-1 gap-4">
          <Link href={`/posts/${data[0].id}`}>
            <div className="relative h-[500px] bg-red-800 rounded-md sm:rounded-lg overflow-hidden">
              <img
                src={data[0].featured_image_url}
                alt=""
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-8 gap-2"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0) 80%)",
                }}
              >
                <p className="text-sm text-gray-300 italic">
                  {formatDate(data[0].createdAt)}
                </p>
                <p className="text-white text-4xl font-bold">{data[0].title}</p>
                <div
                  className="text-sm text-white font-light"
                  dangerouslySetInnerHTML={{
                    __html: truncateString(data[0].content),
                  }}
                />
              </div>
            </div>
          </Link>
          <div className="bg-slate-900 p-8 my-10 border-r-8 border-red-500">
            <h2 className="text-white text-3xl">Latest Posts</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-5 md:gap-y-10 md:gap-x-10 mb-10">
            {data.slice(1).map((post) => (
              <RecentPosts key={post.id} post={post} />
            ))}
          </div>
          <FixtureSection />
        </div>
      </div>
    </div>
  );
}
