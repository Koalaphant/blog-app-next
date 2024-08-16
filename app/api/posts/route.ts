import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const posts = await prisma.post.findMany();
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

