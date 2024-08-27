import { PrismaClient } from "@prisma/client";
import { formatDate } from "@/utils/dateFormat"; // Adjust the import path as needed
import PostRating from "@/components/LikeButtons/PostRating";
import parse from "html-react-parser"; // Import html-react-parser

const prisma = new PrismaClient();

async function getPost(id: number) {
  const post = await prisma.post.findUnique({
    where: { id },
  });

  return post;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id, 10);

  // Fetch post data
  const post = await getPost(postId);

  if (!post) {
    // Handle post not found
    return <div>Post not found</div>;
  }

  const createdAtString =
    typeof post.createdAt === "string"
      ? post.createdAt
      : post.createdAt.toISOString();

  const formattedContent = post.content.replace(
    /<p>/g,
    '<p style="margin-bottom: 1.5rem;">'
  );

  return (
    <div className="grid grid-cols-4 gap-5 p-4 lg:p-20 xl:p-4 max-w-7xl mx-auto">
      <div className="col-span-4 2xl:col-span-3 xl:px-20">
        {post.featured_image_url && (
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-auto rounded-md mb-10"
          />
        )}
        <p className="text-sm text-gray-500 mb-3">
          {formatDate(createdAtString)}
        </p>
        <h1 className="text-3xl font-bold mb-8">{post.title}</h1>

        <div className="leading-relaxed lg:text-xl">
          {parse(formattedContent)}
        </div>

        <div>
          <PostRating postId={post.id} />
        </div>
      </div>
      <div className="flex justify-center pt-10 col-span-4 2xl:col-span-1">
        <h3 className="font-semibold text-2xl">Latest Posts</h3>
      </div>
    </div>
  );
}
