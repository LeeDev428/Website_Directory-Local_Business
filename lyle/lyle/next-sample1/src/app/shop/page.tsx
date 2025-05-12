"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Baseball Cap 'Panda'",
    price: "₱999.00 PHP",
    image: "/images/image10.jpg",
    features: ["Adjustable strap", "High-quality cotton", "Unisex design"],
    soldOut: false,
  },
  {
    id: 2,
    name: "Hasi Hard Kids",
    price: "₱499.00 PHP",
    image: "/images/image4.jpg",
    features: ["Soft fabric", "Durable stitching", "Machine washable"],
    soldOut: false,
  },
  {
    id: 3,
    name: "Quarter Zip-Up Polo and Baseball Cap 'Panda' Bundle",
    price: "₱2,899.00 PHP",
    image: "/images/image3.jpg",
    features: ["Premium fabric", "Comfortable fit", "Stylish design"],
    soldOut: false,
  },
  {
    id: 4,
    name: "Quarter Zip-Up Polo with Chest Pocket",
    price: "₱999.00 PHP",
    oldPrice: "₱1,099.00 PHP",
    image: "/images/image1.jpg",
    features: ["Chest pocket", "Breathable material", "Modern look"],
    soldOut: false,
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with bottom border */}
      <header className="w-full flex justify-between items-center p-4 bg-transparent border-b border-gray-300">
        <div className="text-black font-bold text-xl">
          <Link href="/">ABOVE APPAREL</Link>
        </div>

        {/* Centered Collections Text */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-black font-semibold text-2xl">
          Shop
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

      {/* Product Section */}
      <section className="p-8">
        <h2 className="text-2xl font-semibold text-black">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="border rounded-lg p-4 text-center shadow-md relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
              {product.soldOut && (
                <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full absolute top-2 left-2">
                  Sold out
                </span>
              )}
              <h3 className="text-black mt-4 font-medium">{product.name}</h3>
              {product.oldPrice && <p className="text-gray-500 line-through">{product.oldPrice}</p>}
              <p className="text-black font-bold">{product.price}</p>
              {/* Features List */}
              <ul className="text-sm text-gray-600 mt-2">
                {product.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
              {/* Buy Now Button */}
              <motion.button
                className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm p-4 mt-8">
        &copy; {new Date().getFullYear()} ABOVE APPAREL. All Rights Reserved.
      </footer>
    </div>
  );
}
