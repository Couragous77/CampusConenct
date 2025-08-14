// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // need this for database operations

// a new instance of PrismaClient to interact with the database
const prisma = new PrismaClient();

// GET all posts function
export async function GET() {
  try {
    // try to get all posts from the database in descending order
    const posts = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },

    });
    // return the get posts as a JSON response
    return NextResponse.json(posts);
  } catch (error) {
    //(debugging) log the error to the console
    console.error("Error getting posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

// POST: Create a new post
export async function POST(request: Request) {
  try {
    //try to parse the request as JSON
    const body = await request.json();
    const { title, content } = body;

    //Obviously, we need to check if the title and content are there
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
    }

    // If so, then create a new post in the database
    const newPost = await prisma.posts.create({
      data: { title, content },
    });

    //return that new post
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
