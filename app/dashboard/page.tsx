"use client";

import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
}

export default function PostsDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts when the component mounts
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

  // Handle the deletion of a post
  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      // Update the state to remove the deleted post
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete a post from the backend
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
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <div>
            <h1>{post.title}</h1>
            <button
              className="bg-red-800 text-white p-3"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
