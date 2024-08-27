import React from "react";
import { formatDate } from "@/utils/dateFormat";
import { truncateString } from "@/lib/truncateString";
import { htmlToText } from "html-to-text";
import Link from "next/link";

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

const convertHtmlToText = (html: string): string => {
  return htmlToText(html, {
    wordwrap: 130,
  });
};

const RecentPosts: React.FC<RecentPostsProps> = ({ post }) => {
  const plainContent = convertHtmlToText(truncateString(post.content));

  return (
    <div className="bg-red-800 h-full flex flex-col shadow-md">
      <div
        className="relative bg-cover bg-center h-64"
        style={{ backgroundImage: `url(${post.featured_image_url})` }}
      >
        <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded shadow-md">
          {formatDate(post.createdAt)}
        </div>
      </div>
      <div className="px-5 py-5 flex flex-col flex-grow border-t-4 border-yellow-300">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-white">{post.title}</h3>
        </div>
        <div className="flex-grow flex flex-col justify-end text-white">
          <p className="font-extralight" style={{ marginBottom: "16px" }}>
            {plainContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
