import React from "react";

export default async function Page() {

  const response = await fetch('http://localhost:3000/api/users');


  if (!response.ok) {
    throw new Error('Network response was not ok');
  }


  const data = await response.json();

  console.log(data);

  return (
    <div>
      {/* Map over the posts and render them */}
      {data.map((post: { id: number; title: string; content: string }) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}