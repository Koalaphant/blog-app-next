// app/page.tsx
import BlogSection from "@/components/Blog Section/BlogSection";
import React from "react";

export default async function Page() {
  return (
    <main>
      <section className="bg-red-800 h-[250px] flex justify-center items-center text-white text-2xl font-semibold">
        <h1>Recent Posts</h1>
      </section>
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <BlogSection />
      </div>
    </main>
  );
}
