"use client";

import { uploadImage } from "@/lib/uploadImage";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import TipTap from "./TipTap";

export default function BlogForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imagePath = null;

    if (image) {
      imagePath = await uploadImage(image, "featured_images");
      if (!imagePath) {
        setError("Failed to upload image.");
        return;
      }
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, imagePath }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccess("");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Form Submitted successfully:", result);

      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview(null);
      setSuccess("Submitted successfully.");
      setError("");

      handleContentChange("");

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form.");
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="border border-gray-300 p-3 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-semibold mb-2"
          >
            Content:
          </label>
          <TipTap content={content} onChange={handleContentChange} />{" "}
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
          >
            Featured Image:
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="border border-gray-300 p-3 rounded-lg w-full"
            onChange={handleImageChange}
            ref={imageInputRef}
          />
          {imagePreview && (
            <div className="w-full mt-4">
              <img
                src={imagePreview as string}
                alt="Preview"
                className="w-40 h-40 object-cover border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-red-800 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Submit
        </button>
      </form>
      {error && (
        <p className="mt-4 border border-red-800 bg-red-50 text-red-800 p-3 rounded-lg">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 border border-green-800 bg-green-50 text-green-800 p-3 rounded-lg">
          {success}
        </p>
      )}
    </div>
  );
}
