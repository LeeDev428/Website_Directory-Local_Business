"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 border-b">
        <div className="text-black font-bold text-2xl">
          <Link href="/">ABOVE</Link>
        </div>
        <nav className="flex gap-8 text-lg">
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
        <div className="flex items-center gap-4">
          <span className="text-sm text-black">Philippines | PHP ₱</span>
          <Link href="/account" className="text-black hover:text-gray-600">
            <i className="fas fa-user"></i>
          </Link>
          <Link href="/cart" className="text-black hover:text-gray-600">
            <i className="fas fa-shopping-bag"></i>
          </Link>
          {/* Login Button */}
          <Link href="/login">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Login
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        className="relative w-full h-[400px] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Zoom Animation */}
        <motion.div
          className="absolute w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Image
            src="/images/mani1.jpg"
            alt="Hero"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </motion.div>

        {/* Centered Text Overlay */}
        <motion.div
          className="absolute text-white text-5xl md:text-6xl font-bold text-center bg-opacity-50 px-6 py-4 rounded-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          ABOVE APPAREL
        </motion.div>
      </motion.div>

      {/* Collection Title */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-black">Premium Plains</h1>
        <p className="text-black text-sm">
          Perfect For Daily Wear • 240GSM • Luxurious Comfort • Breathable • Tight Neck Fit •
          Embroidered • Labelled • Shrink-Free
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid />

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm mt-8">
        &copy; 2025 ABOVE. All Rights Reserved.
      </footer>
    </div>
  );
}

// Product Grid Component
function ProductGrid() {
  const products = [
    { name: "Premium Plains - Mustard Yellow", image: "/images/image10.jpg" },
    { name: "Cropped Tee - Classic Black", image: "/images/image1.jpg" },
    { name: "Premium Plains - Dark Mustard", image: "/images/image3.jpg" },
    { name: "Premium - Charcoal Black", image: "/images/image4.jpg" },
    { name: "Premium Hoodie V2.0 - Moon Grey", image: "/images/image9.jpg" },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
      {products.map((item, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered effect
        >
          {/* Product Image with Hover Animation */}
          <motion.div
            className="w-full h-56 relative overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={item.image}
              alt={`${item.name} Tee`}
              fill
              className="object-cover rounded-lg"
              quality={100}
            />
          </motion.div>

          {/* Product Details */}
          <p className="mt-3 text-lg font-semibold text-black">{item.name} Tee</p>
          <p className="text-red-500 text-sm line-through">₱899.00 PHP</p>
          <p className="text-black font-bold text-xl">₱749.00 PHP</p>

          {/* Add to Cart Button with Click Animation */}
          <motion.button
            className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      ))}
    </section>
  );
}
