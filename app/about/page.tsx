import Image from "next/image";
import Link from "next/link";

// Function for About page for Campus Connect
export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10 leading-relaxed">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600">About Campus Connect</h1>
        <p className="text-lg mt-4 text-gray-700">
          Student Resource Platform
        </p>
        <div className="flex justify-center mt-4">
          <Image
            src="/Images/PawLogo.png"
            alt="Campus Connect Logo"
            width={80}
            height={80}
          />
        </div>
      </div>

      <div className="mb-8">
        <Image
          src="/Images/Banner.jpg"
          alt="Banner"
          width={900}
          height={200}
          className="mx-auto rounded-md"
        />
      </div>

        {/* Note that AI was used to create the text for the about section after feeding it information about Campus Connect*/}
      <div className="space-y-6 text-gray-800">
        <p>
          <strong>Campus Connect</strong> is an innovative student resource platform designed to enhance communication, collaboration, and engagement across college communities. Built with both students and administrators in mind, Campus Connect provides a centralized hub where users can access academic resources, participate in forums, explore events, and stay informed about campus activities.
        </p>
        <p>
          Whether you're a new student navigating university life, a club leader promoting your next big event, or an administrator managing student affairs, Campus Connect empowers you to interact seamlessly in a digital space tailored for higher education.
        </p>
        <p>
          From class-tagged discussion posts to real-time updates on campus happenings, our platform promotes transparency, accessibility, and a stronger sense of community. With intuitive tools and a user-friendly design, Campus Connect bridges the gap between student needs and institutional support.
        </p>
        <p>
          At its core, Campus Connect is more than just a website, it's a dynamic ecosystem where ideas flourish, support is just a click away, and every student voice matters.
        </p>
      </div>
        <br></br>
      <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
        <Link href="/">Back to Home</Link>
      </button>

    </main>
  );
}
