"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [joke, setJoke] = useState("");
  const [weather, setWeather] = useState("");

  // Load Elfsight script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch Jokes and Weather
  useEffect(() => {
    fetch("/api/jokes")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setJoke(data[0].joke);
        } else if (data.joke) {
          setJoke(data.joke);
        } else {
          setJoke("No jokes available right now.");
        }
      })
      .catch(() => setJoke("Failed to load joke."));

    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.temp && data.description && data.location) {
          const desc = data.description;
          let emoji = "☁️";
          if (desc.includes("clear")) emoji = "☀️";
          else if (desc.includes("rain")) emoji = "🌧️";
          else if (desc.includes("cloud")) emoji = "☁️";
          else if (desc.includes("snow")) emoji = "❄️";

          const formatted = `${data.location}: ${data.temp}°C, ${desc.charAt(0).toUpperCase() + desc.slice(1)} ${emoji}`;
          setWeather(formatted);
        } else {
          setWeather("Weather data unavailable.");
        }
      })
      .catch(() => setWeather("Failed to load weather."));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-red-600">Campus Connect</h1>
            <h3 className="text-gray-600">Student Resource Platform</h3>
            <Image src="/Images/PawLogo.png" alt="Campus Connect Logo" width={30} height={30} />
          </div>
          <Image src="/Images/Banner.jpg" alt="Banner" width={300} height={300} className="rounded" />
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-red-600 text-white p-3">
        <ul className="flex justify-center space-x-6">
          <li><Link href="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link href="/forum" className="hover:text-gray-200">Forum</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 p-6">
        {/* Left Side Image */}
        <div className="w-1/4 text-center hidden md:block">
          <Image src="/Images/FrostburgMap.png" alt="Frostburg State" width={500} height={500} className="rounded shadow" />
          <a href="https://www.frostburg.edu/" target="_blank" rel="noopener noreferrer">
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Visit FSU</button>
          </a>
        </div>

        {/* Center Content */}
        <div className="flex-grow px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Your Personal Resource Hub For All Things College</h1>
          <h3 className="text-xl text-gray-700">This is your student resource portal. Use the navigation to find forums, events, or manage your profile.</h3>
        </div>

        {/* Quick Links Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded shadow hidden lg:block">
          <h3 className="text-red-600 font-bold mb-3">Quick Access</h3>
          <ul className="space-y-2">
            <li><a href="https://paws.frostburg.edu/" className="text-blue-600 hover:underline">Paws</a></li>
            <li><a href="https://frostburg.instructure.com/" className="text-blue-600 hover:underline">Canvas</a></li>
            <li><a href="https://frostburg.campus-dining.com/" className="text-blue-600 hover:underline">Dining</a></li>
            <li><a href="https://frostburg.academicworks.com/" className="text-blue-600 hover:underline">Scholarship Portal</a></li>
            <li><a href="https://events.frostburg.edu/auth/login" className="text-blue-600 hover:underline">Calendar</a></li>
            <li><a href="https://www.frostburg.edu/academics/calendar.php" className="text-blue-600 hover:underline">Academic Calendar</a></li>
            <li><a href="https://www.frostburg.edu/student-engagement/student-life/service/paws-pantry/PAWS-Pantry.php" className="text-blue-600 hover:underline">Paws Pantry</a></li>
          </ul>
        </div>
      </main>

      {/* Weather Section */}
      <section className="bg-white shadow rounded p-4 m-4 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Todays Weather</h2>
        <p className="text-gray-700">{weather}</p>
      </section>

      {/* Joke Section */}
      <section className="bg-white shadow rounded p-4 m-4 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Random Joke</h2>
        <p className="text-gray-700">{joke}</p>
      </section>

      {/* Footer Image */}
      <footer className="flex justify-center p-4 bg-gray-100">
        <Image src="/Images/FSU.jpg" alt="Footer Campus Image" width={500} height={200} className="rounded" />
      </footer>

      {/* Chatbox */}
      <div className="fixed bottom-5 right-5">
        {!chatOpen && (
          <button className="bg-red-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-red-700" onClick={() => setChatOpen(true)}>
            <Image src="/favicon.ico" alt="Chat Icon" width={24} height={24} className="rounded" />
          </button>
        )}
        <div className={`bg-white w-80 h-96 p-4 shadow-lg rounded-lg flex flex-col transition-all duration-300 ${chatOpen ? "block" : "hidden"}`}>
          <div className="flex justify-between items-center border-b pb-2">
            <h4 className="font-bold text-red-600">Chatbox</h4>
            <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-700">✖</button>
          </div>
          <div className="flex-grow overflow-y-auto p-2 text-sm text-gray-700">
            <div className="elfsight-app-d9c59af0-1821-48e8-b40f-bd22072d1d40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
