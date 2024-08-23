"use client";

import React, { useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

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

        // Check session cookies to determine if post is liked or disliked
        setIsLiked(!!getCookie(`liked_${postId}`));
        setIsDisliked(!!getCookie(`disliked_${postId}`));
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

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
    if (isLiked) {
      // If already liked, remove like
      updateLikeRating(likeRating - 1);
      setIsLiked(false);
      deleteCookie(`liked_${postId}`);
    } else {
      // If disliked, remove dislike first
      if (isDisliked) {
        updateLikeRating(likeRating + 1);
        setIsDisliked(false);
        deleteCookie(`disliked_${postId}`);
      }
      // Add like
      updateLikeRating(likeRating + 1);
      setIsLiked(true);
      setCookie(`liked_${postId}`, "true", { maxAge: 60 * 60 });
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      // If already disliked, remove dislike
      updateLikeRating(likeRating + 1);
      setIsDisliked(false);
      deleteCookie(`disliked_${postId}`);
    } else {
      // If liked, remove like first
      if (isLiked) {
        updateLikeRating(likeRating - 1);
        setIsLiked(false);
        deleteCookie(`liked_${postId}`);
      }
      // Add dislike
      updateLikeRating(likeRating - 1);
      setIsDisliked(true);
      setCookie(`disliked_${postId}`, "true", { maxAge: 60 * 60 });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleDislike}
        className={`px-4 py-2 rounded transition-colors duration-300 ${
          isDisliked
            ? "bg-red-700 text-white ring-2 ring-red-700"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        {isDisliked ? "⬇️" : "⬇️"}
      </button>
      <span className="text-xl">{likeRating}</span>
      <button
        onClick={handleLike}
        className={`px-4 py-2 rounded transition-colors duration-300 ${
          isLiked
            ? "bg-green-700 text-white ring-2 ring-green-700"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isLiked ? "⬆️" : "⬆️"}
      </button>
    </div>
  );
};

export default PostRating;