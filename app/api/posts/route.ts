import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',  // Sort by 'created_at' in ascending order (oldest to newest)
            },
        });
        return new Response(JSON.stringify(posts), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(request: Request) {
    try {
        const { title, content, imagePath } = await request.json();

        if (!title || !content) {
            return new Response(
                JSON.stringify({ message: "Title and content are required." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                featured_image_url: imagePath, // Include imagePath here
            },
        });

        return new Response(JSON.stringify(newPost), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error('Error creating post:', error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
