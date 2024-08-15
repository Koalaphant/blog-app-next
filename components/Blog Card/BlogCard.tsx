import React from "react";

export default function BlogCard({
  post,
}: {
  post: { id: number; title: string; content: string };
}) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
}
