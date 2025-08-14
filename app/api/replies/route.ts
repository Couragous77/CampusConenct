import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Still need this for database operations

const prisma = new PrismaClient();

// GET request for all replies for a specific post
export async function GET(req: Request) {
  // Get the postId from the URL
  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get("postId"));

  // Obviously, the postID needs to exsist
  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  try {
    // try to get all the replies for the post in ascending order
    const replies = await prisma.reply.findMany({
      where: { postId },
      orderBy: { created_at: "asc" },
    });
    return NextResponse.json(replies);
  } 
  //(Debugging)
  catch (error) {
    return NextResponse.json({ error: "Failed to fetch replies" }, { status: 500 });
  }
}

// For adding a new reply to a post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { postId, content } = body;

    // Obviously, we need to check if the postId and content are there
    if (!postId || !content) {
      return NextResponse.json({ error: "postId and content required" }, { status: 400 });
    }

    // If so, then create a new reply in the database
    const newReply = await prisma.reply.create({
      data: { postId, content },
    });

    // return that new reply
    return NextResponse.json(newReply);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create reply" }, { status: 500 });
  }
}
