import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const postId = parseInt(params.id, 10);

        if (isNaN(postId)) {
            return new Response(
                JSON.stringify({ message: "Invalid post ID" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return new Response(
                JSON.stringify({ message: "Post not found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const postId = parseInt(params.id, 10);
        const { like_rating } = await request.json();

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

        if (typeof like_rating !== 'number') {
            return new Response(
                JSON.stringify({ message: "like_rating must be a number" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { like_rating },
        });

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

export async function DELETE(
    request: Request, 
    { params }: { params: { id: string } }
): Promise<Response> {
    try {
        const postID = parseInt(params.id, 10);

        if (isNaN(postID)) {
            return new Response('Invalid post ID', { status: 400 });
        }

        const existingPost = await prisma.post.findUnique({
            where: { id: postID }
        });

        if (!existingPost) {
            return new Response('Post not found', { status: 404 });
        }

        await prisma.post.delete({
            where: { id: postID }
        });

        return new Response('Post deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}