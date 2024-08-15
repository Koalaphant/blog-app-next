// app/page.tsx
import BlogSection from "@/components/Blog Section/BlogSection";
import React from "react";

export default async function Page() {
  return (
    <main className="mt-10 lg:mt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <BlogSection />
      </div>
    </main>
  );
}
