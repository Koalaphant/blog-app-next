"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

export default function BlogForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      console.log("Form Submitted sucessfully:", result);

      setTitle("");
      setContent("");
      setSuccess("Submitted successfully.");
      setError("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-w-full space-y-4  px-8">
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
        <button
          type="submit"
          className="bg-red-800 text-white py-2 px-4 rounded-lg"
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
    </div>
  );
}
