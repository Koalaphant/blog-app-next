"use client";
import React, { useState } from "react";

export default function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Handle title input changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  // Handle content input changes
  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setContent(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const body = {
      title,
      content,
    };

    console.log(body);

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={handleTitleChange}
        />
      </label>
      <br />
      <label>
        Content:
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
