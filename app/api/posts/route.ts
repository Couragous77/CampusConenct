// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma"; 

const prisma = new PrismaClient();

// GET: Return all posts
export async function GET() {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

// POST: Create a new post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
    }

    const newPost = await prisma.posts.create({
      data: { title, content },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
