"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-transparent">
        <div className="text-black font-bold text-xl">
          <Link href="/">ABOVE APPAREL</Link>
        </div>
        <nav className="flex gap-6">
          <Link href="/shop" className="text-black hover:text-gray-600">
            Shop
          </Link>
          <Link href="/Collections" className="text-black hover:text-gray-600">
            Collections
          </Link>
          <Link href="/about" className="text-black hover:text-gray-600">
            About
          </Link>
        </nav>
      </header>

      {/* Login Form */}
      <div className="w-full max-w-md p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-black font-semibold text-center mb-6">Login</h2>
        <form className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="/forgot-password" className="text-sm text-black hover:underline">
            Forgot your password?
          </Link>
          <button
            type="submit"
            className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
          >
            Sign in
          </button>
        </form>
        <Link href="/register" className="text-sm text-black hover:underline">
            Create account
          </Link>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-gray-500 text-sm">
        &copy; 2025 ABOVE APPAREL. All Rights Reserved.
      </footer>
    </div>
  );
}
