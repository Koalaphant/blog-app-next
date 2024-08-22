import React from "react";
import { formatDate } from "@/utils/dateFormat";
import { truncateString } from "@/lib/truncateString";
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

const RecentPosts: React.FC<RecentPostsProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
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
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-white">{post.title}</h3>
          </div>
          <div className="flex-grow flex flex-col justify-end text-white">
            <div
              className="font-extralight"
              dangerouslySetInnerHTML={{
                __html: truncateString(post.content).replace(
                  /<p>/g,
                  '<p style="margin-bottom: 16px;">'
                ),
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecentPosts;
