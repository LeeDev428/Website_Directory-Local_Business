"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");

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
          <Link href="/collections" className="text-black hover:text-gray-600">
            Collections
          </Link>
          <Link href="/about" className="text-black hover:text-gray-600">
            About
          </Link>
        </nav>
      </header>

      {/* Register Form */}
      <div className="w-full max-w-md p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-black font-semibold text-center mb-6">Sign Up</h2>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </form>
        <div className="text-center mt-4">
          <Link href="/login" className="text-sm text-black hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-gray-500 text-sm">
        &copy; 
      </footer>
    </div>
  );
}
