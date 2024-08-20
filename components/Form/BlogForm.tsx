"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import ImageUploadForm from "./ImageUploadFormTest";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anonymous Key is not defined.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BlogForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("your-bucket-name") // Replace with your bucket name
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      setError("Failed to upload image.");
      return null;
    }

    return data?.path;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image) {
      const imagePath = await uploadImage(image);
      if (!imagePath) return; // Stop form submission if image upload fails
      // You might want to save `imagePath` to your database or form data here
    }

    try {
      const response = await fetch("api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        setError(errorData.message);
        setSuccess("");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Form Submitted successfully:", result);

      setTitle("");
      setContent("");
      setSuccess("Submitted successfully.");
      setError("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-w-full space-y-4 px-8">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="border p-2 mb-4 w-full"
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={handleContentChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="image">Featured Image:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="border p-2 w-full mb-4"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="w-full mt-4">
              <img
                src={imagePreview as string}
                alt="Preview"
                className="w-40 h-40 object-cover border"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-red-800 text-white py-2 px-8 rounded-lg mt-5"
        >
          Submit
        </button>
      </form>
      {error && (
        <p className="mt-4 border border-red-800 p-2 text-red-800">{error}</p>
      )}
      {success && (
        <p className="mt-4 border border-green-800 p-2 text-green-800">
          {success}
        </p>
      )}
      <div>
        <ImageUploadForm />
      </div>
    </div>
  );
}
