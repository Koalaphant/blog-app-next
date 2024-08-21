import React from "react";
import { formatDate } from "@/utils/dateFormat";

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
    <div>
      <div
        className="bg-cover bg-center h-64"
        style={{ backgroundImage: `url(${post.featured_image_url})` }}
      ></div>

      <h3 className="text-xl font-bold mt-2">{post.title}</h3>
      <p className="text-gray-600">{post.content}</p>
      <p className="text-sm text-gray-400">{formatDate(post.createdAt)}</p>
    </div>
  );
};

export default RecentPosts;
