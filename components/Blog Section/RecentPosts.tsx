import React from "react";
import { formatDate } from "@/utils/dateFormat";
import { format } from "path";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  like_rating: number;
  featured_image_url: string;
}

interface RecentPostsProps {
  post: Post;
}

const RecentPosts: React.FC<RecentPostsProps> = ({ post }) => {
  return (
    <div className="bg-red-800 h-full flex flex-col">
      <div
        className="relative bg-cover bg-center h-64"
        style={{ backgroundImage: `url(${post.featured_image_url})` }}
      >
        <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded">
          {formatDate(post.createdAt)}
        </div>
      </div>

      <div className="px-5 py-5 flex flex-col flex-grow">
        <div className="h-16 mb-2">
          <h3 className="text-2xl font-bold text-white">{post.title}</h3>{" "}
        </div>
        <div className="flex-grow flex flex-col justify-end text-white">
          <p className="font-extralight">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
