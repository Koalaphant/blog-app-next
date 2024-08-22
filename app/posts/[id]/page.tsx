import { PrismaClient } from "@prisma/client";
import { formatDate } from "@/utils/dateFormat"; // Adjust the import path as needed

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

  // Ensure the createdAt is a string; if it's a Date object, convert it
  const createdAtString =
    typeof post.createdAt === "string"
      ? post.createdAt
      : post.createdAt.toISOString();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
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

      <div
        className="font-extralight text-xl"
        dangerouslySetInnerHTML={{
          __html: post.content.replace(
            /<p>/g,
            '<p style="margin-bottom: 1.5rem;">'
          ),
        }}
      />
    </div>
  );
}
