"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

export default function BlogForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // Handler for title input change
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Handler for content input change
  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log("Form submitted with title:", title);
    console.log("Form submitted with content:", content);

    // Clear form after submission
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 min-w-full px-8">
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
      <button type="submit" className="bg-red-800 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
}
