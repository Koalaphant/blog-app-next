import React from "react";
import { formatDate } from "@/utils/dateFormat";
import PostRating from "@/components/LikeButtons/PostRating";
import parse from "html-react-parser";
import SideBarPosts from "@/components/Blog Section/SideBarPosts";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  like_rating: number;
  featured_image_url: string;
}

async function fetchPost(id: number): Promise<Post | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/posts/${id}`, {
      next: { revalidate: 5 },
    });

    if (!response.ok) {
      throw new Error("Post not found");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function fetchAllPosts(): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/posts`, {
      next: { revalidate: 5 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id, 10);
  const post = await fetchPost(postId);
  const allPosts = await fetchAllPosts();

  if (!post) {
    return <div>Post not found</div>;
  }

  const filteredPosts = allPosts.filter((p) => p.id !== postId);

  const createdAtString =
    typeof post.createdAt === "string"
      ? post.createdAt
      : new Date(post.createdAt).toISOString();

  const formattedContent = post.content.replace(
    /<p>/g,
    '<p style="margin-bottom: 1.5rem;">'
  );

  return (
    <div className="grid grid-cols-4 gap-5 p-4 lg:p-20 xl:p-4 max-w-7xl mx-auto">
      <div className="col-span-4 2xl:col-span-3 xl:px-20">
        {post.featured_image_url && (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-auto rounded-md mb-10"
          />
        )}
        <p className="text-sm text-gray-500 mb-3">
          {formatDate(createdAtString)}
        </p>
        <h1 className="text-3xl font-bold mb-8">{post.title}</h1>

        <div className="leading-relaxed lg:text-xl">
          {parse(formattedContent)}
        </div>

        <div>
          <PostRating postId={post.id} />
        </div>
      </div>
      <div className="flex justify-center col-span-4 2xl:col-span-1">
        <div>
          {filteredPosts.slice(0, 4).map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <SideBarPosts
                id={post.id}
                title={post.title}
                featured_image_url={post.featured_image_url}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
