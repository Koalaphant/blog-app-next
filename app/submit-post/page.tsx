import BlogForm from "@/components/Form/BlogForm";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-3/4 max-w-4xl mx-auto">
        <div className="bg-red-800 p-2 my-8">
          <h1 className="text-5xl text-white my-10 text-center font-bold">
            Submit Your Article
          </h1>
        </div>
        <BlogForm />
      </div>
    </div>
  );
}
