"use client";

import { useState, useEffect } from "react";

// Define the Post type
interface Post {
  id: number;
  title: string;
}

export default function PostItem() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        // Type assertion to handle the unknown type
        setError((error as Error).message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      // Type assertion to handle the unknown type
      setError((error as Error).message || "Failed to delete the post");
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
      // Type assertion to handle the unknown type
      throw new Error((error as Error).message || "Failed to delete the post");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
