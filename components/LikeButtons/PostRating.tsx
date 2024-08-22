"use client";

import React, { useState, useEffect } from "react";

// Define the URL for the API endpoint
const API_URL = "/api/posts";

interface PostRatingProps {
  postId: number;
}

const PostRating: React.FC<PostRatingProps> = ({ postId }) => {
  const [likeRating, setLikeRating] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${postId}`);
        const data = await response.json();
        if (response.ok) {
          setLikeRating(data.like_rating || 0);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  // Function to update like_rating on the server
  const updateLikeRating = async (newRating: number) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like_rating: newRating }),
      });

      if (response.ok) {
        setLikeRating(newRating);
      } else {
        console.error("Failed to update like_rating");
      }
    } catch (error) {
      console.error("Error updating like_rating:", error);
    }
  };

  const handleLike = () => {
    // Increment the like_rating and toggle the like state
    if (!isLiked) {
      setIsLiked(true);
      setIsDisliked(false); // Ensure dislike is toggled off
      updateLikeRating(likeRating + 1);
    } else {
      setIsLiked(false);
      updateLikeRating(likeRating - 1);
    }
  };

  const handleDislike = () => {
    // Decrement the like_rating and toggle the dislike state
    if (!isDisliked) {
      setIsDisliked(true);
      setIsLiked(false); // Ensure like is toggled off
      updateLikeRating(likeRating - 1);
    } else {
      setIsDisliked(false);
      updateLikeRating(likeRating + 1);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleDislike}
        className={`px-4 py-2 rounded ${
          isDisliked ? "bg-red-600 text-white" : "bg-red-500 text-white"
        } hover:bg-red-700`}
      >
        Dislike
      </button>
      <span className="text-xl">{likeRating}</span>
      <button
        onClick={handleLike}
        className={`px-4 py-2 rounded ${
          isLiked ? "bg-green-600 text-white" : "bg-green-500 text-white"
        } hover:bg-green-700`}
      >
        Like
      </button>
    </div>
  );
};

export default PostRating;
