"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch posts on load
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  // Handle new post submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      const newPost = await res.json();
      setPosts([newPost, ...posts]); // add new post to top
      setTitle("");
      setContent("");
    } else {
      console.error("Post creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-red-600">Campus Connect</h1>
            <h3 className="text-gray-600">Student Resource Platform</h3>
            <Image src="/Images/PawLogo.png" alt="Logo" width={30} height={30} />
          </div>
          <Image src="/Images/Banner.jpg" alt="Banner" width={300} height={80} className="rounded" />
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-red-600 text-white p-3">
        <ul className="flex justify-center space-x-6">
          <li><Link href="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link href="/forum" className="hover:text-gray-200">Forum</Link></li>
        </ul>
      </nav>

      {/* Title */}
      <h2 className="text-center mt-6 text-3xl font-bold text-red-600">User Forum</h2>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        {/* Posts Viewer */}
        <div className="w-full lg:w-2/3 bg-white border border-gray-300 p-4 rounded-lg max-h-[600px] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="border-t-4 border-red-600 border-b border-gray-200 py-4 mb-4">
                <strong className="text-red-600 text-lg">{post.title}</strong>
                <p className="text-gray-700 mt-2 whitespace-pre-line">{post.content}</p>
                <p className="text-gray-400 text-sm mt-1">Posted on: {new Date(post.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>

        {/* Post Form */}
        <div className="w-full lg:w-1/3 bg-white border border-gray-300 p-4 rounded-lg h-fit">
          <h3 className="text-xl font-semibold mb-4">Create a Post</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full border p-2 rounded mb-3"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share something..."
              className="w-full border p-2 rounded mb-3 h-28"
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
