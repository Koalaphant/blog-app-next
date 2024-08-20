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

export async function POST(request: Request) {
    try{
        const {title, content} = await request.json()
        if (!title || !content) {
            return new Response(
                JSON.stringify({ message: "Title and content are required." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        
        const newPost = await prisma.post.create({
            data:{
                title,
                content
            }
        })

        return new Response(JSON.stringify(newPost), {
            status: 201,
            headers:{"Content-Type": "application/json"}
        })
    } catch(error){
        console.error('Error creating post:', error);
        return new Response(
            JSON.stringify({message: 'Internal Server Error'}),
            {status: 500, headers: {"Content-Type": "application/json"}}
        )
    }
}