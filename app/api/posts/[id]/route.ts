import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const postId = parseInt(params.id, 10);

        // Validate that the ID is a number
        if (isNaN(postId)) {
            return new Response(JSON.stringify({ message: "Invalid post ID" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Fetch the post by ID
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        // Check if the post exists
        if (!post) {
            return new Response(JSON.stringify({ message: "Post not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Return the post data
        return new Response(JSON.stringify(post), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}