import React from "react";
import { formatDate } from "@/utils/dateFormat";

export default function BlogCard({
  post,
}: {
  post: { id: number; title: string; content: string; createdAt: string };
}) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg flex flex-col h-64">
      <div className="flex-none mb-2 h-16 flex items-start">
        <h2 className="text-xl font-semibold">{post.title}</h2>
      </div>
      <div className="flex-grow mb-2 flex">
        <p className="text-gray-700">{post.content}</p>
      </div>
      <div className="flex-none text-gray-500 h-8 flex items-end">
        <p>{formatDate(post.createdAt)}</p>
      </div>
    </div>
  );
}
