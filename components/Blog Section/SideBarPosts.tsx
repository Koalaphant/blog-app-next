// SideBarPosts.tsx

import React from "react";

interface Post {
  id: number;
  title: string;
  featured_image_url: string;
}

const SideBarPosts: React.FC<Post> = ({ id, title, featured_image_url }) => {
  return (
    <div key={id} className="mb-4">
      {featured_image_url && (
        <img
          src={featured_image_url}
          alt={title}
          className="w-full h-auto rounded-md mb-2"
        />
      )}
      <h4 className="font-semibold text-lg">{title}</h4>
    </div>
  );
};

export default SideBarPosts;
