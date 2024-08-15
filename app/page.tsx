import BlogSection from "@/components/Blog Section/BlogSection";
import React from "react";
import { fetchPosts } from "@/lib/fetchPosts";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  like_rating: number;
  featured_image_url: string;
}

export default async function Page() {
  const data: Post[] = await fetchPosts();
  return (
    <div className="my-10 mx-10">
      <div className="grid grid-cols-4">
        <div className="h-[500px] bg-red-800 col-span-3">Test1</div>
        <div className="h-[500px] bg-red-400 flex flex-col justify-center items-center">
          <p>APR 14 - 14:00 GMT ANFIELD</p>
          <div className="flex">
            <div className="flex flex-col items-center">
              <div className="h-[30px] w-[30px] bg-cyan-50"></div>
              <p>Liverpool</p>
            </div>
            <div>
              <p>vs</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[30px] w-[30px] bg-cyan-50"></div>
              <p>Arsensal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
