import React from "react";
import { formatDate } from "@/utils/dateFormat";
import { truncateString } from "@/lib/truncateString";

export default function BlogCard({
  post,
}: {
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    like_rating: number;
    featured_image_url: string;
  };
}) {
  return (
    <div className="max-w-sm rounded-xl border border-gray-200 overflow-hidden shadow-md">
      <div className="h-60 overflow-hidden rounded-t-xl">
        <img
          src={post.featured_image_url}
          alt="blog images"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[190px] flex flex-col justify-between p-5">
        <div className="mb-2">
          <h3 className="font-semibold text-red-800 text-lg mb-2">
            {post.title}
          </h3>
          <p>{truncateString(post.content)}</p>
        </div>
        <div className="flex gap-2 justify-between">
          <p>{formatDate(post.createdAt)}</p>
          <p>👍🏼 {post.like_rating}</p>
        </div>
      </div>
    </div>

    // <div className="p-4 border border-gray-300 rounded-lg flex flex-col h-64">
    //   <div className="flex-none mb-2 h-16 flex items-start">
    //     <img src={post.featured_image_url} alt="" />
    //     <h2 className="text-xl font-semibold">{post.title}</h2>
    //   </div>
    //   <div className="flex-grow mb-2 flex">
    //     <p className="text-gray-700">{post.content}</p>
    //   </div>
    //   <div className="flex text-gray-500 h-8 items-end justify-between">
    //     <p>{formatDate(post.createdAt)}</p>
    //     <div className="flex gap-2">
    //       <p>👍🏼</p>
    //       <p>{post.like_rating}</p>
    //     </div>
    //   </div>
    // </div>
  );
}
