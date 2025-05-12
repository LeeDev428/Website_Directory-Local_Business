"use client";

import { useState } from "react";
import Link from "next/link";

export default function AboutUs() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"} transition duration-300`}>
      
      {/* Header (Sticky to Top) */}
      <header className="sticky top-0 left-0 w-full flex justify-between items-center p-4 bg-opacity-90 z-50 backdrop-blur-md">
        <div className="font-bold text-xl">
          <Link href="/">ABOVE APPAREL</Link>
        </div>
        <nav className="flex gap-6">
          <Link href="/shop" className="hover:text-gray-400">Shop</Link>
          <Link href="/Collections" className="hover:text-gray-400">Collections</Link>
          <Link href="/about" className="hover:text-gray-400">About</Link>
        </nav>
        {/* Theme Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="px-3 py-1 border border-gray-500 rounded-md hover:bg-gray-700 hover:text-white transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">

        {/* Hero Section with CSS Zoom Animation */}
        <div 
          className={`w-full flex flex-col items-center justify-center text-center py-24 px-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"} shadow-md zoom-in-out`}
        >
          <h1 className="text-4xl font-extrabold mb-4">Elevate Your Style</h1>
          <p className={`text-lg max-w-2xl ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            At <strong>Above Apparel</strong>, fashion is more than just clothing—it's a statement. 
            Designed for dreamers and go-getters, our collections embody confidence, quality, and creativity.
          </p>
        </div>

        {/* Brand Story with Zoom Animation */}
        <div className="max-w-5xl px-6 py-12 text-center zoom-in-out">
          <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
          <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
            Founded with a vision to redefine streetwear, <strong>Above Apparel</strong> is more than a brand—it's a movement. 
            We craft high-quality, minimalist designs that empower individuals to express themselves boldly. 
            Our commitment to innovation and sustainability ensures every piece you wear is made with purpose.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition"
          >
            Explore Collections
          </Link>
        </div>

      </main>

      {/* Footer (Sticky to Bottom) */}
      <footer className="sticky bottom-0 w-full bg-opacity-90 z-50 text-center text-gray-500 text-sm p-4 backdrop-blur-md">
        &copy; 2025 Above Apparel. All Rights Reserved.
      </footer>

      {/* Tailwind Custom Styles */}
      <style jsx>{`
        .zoom-in-out {
          animation: zoomIn 0.8s ease-in-out;
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .zoom-in-out:hover {
          transform: scale(0.98);
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
