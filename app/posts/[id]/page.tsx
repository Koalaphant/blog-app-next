import { PrismaClient } from "@prisma/client";

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
    // Handle post not found (e.g., you can throw an error, return null, or show a custom "Not Found" component)
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.featured_image_url && (
        <img src={post.featured_image_url} alt={post.title} />
      )}
    </div>
  );
}
