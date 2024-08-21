import React from "react";
import { truncateString } from "@/lib/truncateString";
import { formatDate } from "@/utils/dateFormat";

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
    next: { revalidate: 4 },
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
    <div className="my-10 lg:mx-10">
      <div className="container mx-auto max-w-full lg:max-w-8xl">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          <div className="relative h-[500px] bg-red-800 xl:col-span-3 rounded-md sm:rounded-lg overflow-hidden">
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
              <p className="text-sm text-white font-light">
                {truncateString(data[0].content)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-2">
            {data.slice(1).map((post) => (
              <div key={post.id}>
                <h4 className="font-semibold">{post.title}</h4>
              </div>
            ))}
          </div>
          <div className="h-[500px]  bg-slate-900 text-white flex flex-col justify-center items-center rounded-lg border-t-8 border-red-500 gap-4">
            <p>APR 14 - 14:00 GMT ANFIELD</p>
            <div className="flex mt-5">
              <div className="flex flex-col items-center">
                <div className="h-[50px] w-[50px] bg-cyan-50 mb-4"></div>
                <p>Liverpool</p>
              </div>
              <div className="flex items-center justify-center mx-3">
                <p>vs</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-[50px] w-[50px] bg-cyan-50 mb-4"></div>
                <p>Arsenal</p>
              </div>
            </div>
            <div>
              <button className="bg-red-800 px-4 py-2 rounded-lg">
                View All 23/24 Fixtures
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
