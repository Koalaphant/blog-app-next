import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handler for GET requests to fetch a post by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const postId = parseInt(params.id, 10);

        // Validate that the ID is a number
        if (isNaN(postId)) {
            return new Response(
                JSON.stringify({ message: "Invalid post ID" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Fetch the post by ID
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        // Check if the post exists
        if (!post) {
            return new Response(
                JSON.stringify({ message: "Post not found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Return the post data
        return new Response(
            JSON.stringify(post),
            {
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

// Handler for PATCH requests to update a post's like_rating
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const postId = parseInt(params.id, 10);
        const { like_rating } = await request.json();

        // Validate that the ID is a number and like_rating is provided
        if (isNaN(postId)) {
            return new Response(
                JSON.stringify({ message: "Invalid post ID" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        if (like_rating === undefined) {
            return new Response(
                JSON.stringify({ message: "like_rating is required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Ensure like_rating is a number
        if (typeof like_rating !== 'number') {
            return new Response(
                JSON.stringify({ message: "like_rating must be a number" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Update the post's like_rating
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { like_rating },
        });

        // Return the updated post
        return new Response(
            JSON.stringify(updatedPost),
            {
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error('Error updating post like_rating:', error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}