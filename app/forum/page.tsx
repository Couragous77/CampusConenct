"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Forum() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Welcome to the Forum!", content: "Feel free to share your ideas here." },
    { id: 2, title: "Campus Event", content: "Don't forget the FSU campus festival this weekend!" },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const newPost = {
        id: posts.length + 1,
        title,
        content,
      };
      setPosts([newPost, ...posts]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-red-600">Campus Connect</h1>
            <h3 className="text-gray-600">Student Resource Platform</h3>
            <Image
              src="/Images/PawLogo.png"
              alt="Campus Connect Logo"
              width={30}
              height={30}
            />
          </div>
          <Image
            src="/Images/Banner.jpg"
            alt="Banner"
            width={300}
            height={300}
            className="rounded"
          />
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-red-600 text-white p-3">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link href="/forum" className="hover:text-gray-200">Forum</Link>
          </li>
        </ul>
      </nav>

      {/* Forum Content */}
      <main className="flex-grow p-6 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">User Forum</h1>

        {/* Post Creation Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <textarea
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-3 h-24"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Post
          </button>
        </form>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center">No posts yet. Be the first to post!</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-bold text-red-600">{post.title}</h3>
                <p className="text-gray-700 mt-2">{post.content}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
