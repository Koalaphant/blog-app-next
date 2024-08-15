// app/page.tsx
import BlogSection from "@/components/Blog Section/BlogSection";
import React from "react";

export default async function Page() {
  return (
    <main>
      <section className="bg-red-800 h-[250px] md:h-[350px] mb-16 flex justify-center items-center ">
        <h1 className="text-white text-4xl sm:text-5xl font-semibold">
          Recent Posts
        </h1>
      </section>
      <div className="px-8 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <BlogSection />
      </div>
    </main>
  );
}
