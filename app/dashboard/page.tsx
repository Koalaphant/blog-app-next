"use client";

import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
}

export default function PostsDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      // Update the state to remove the deleted post
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postId: number): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      console.log(`Post with id ${postId} deleted successfully`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-center pt-10 font-extrabold text-3xl ">Dashboard</h1>
      <ul className="py-10 px-3 flex flex-col gap-5">
        {posts.map((post) => (
          <li key={post.id} className="flex border-2 p-4">
            <div className="flex flex-col gap-2">
              <h1>{post.title}</h1>
              <button
                className="bg-red-800 text-white p-2 w-full"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
