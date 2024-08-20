import BlogForm from "@/components/Form/BlogForm";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl my-10">Write your article</h1>
      <BlogForm />
    </div>
  );
}
