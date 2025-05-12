"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Collections = [
  {
    id: 1,
    name: "UA Cropped Tee - Classic White",
    price: "₱749.00 PHP",
    oldPrice: "₱899.00 PHP",
    image: "/images/image10.jpg",
    soldOut: true,
  },
  {
    id: 2,
    name: "UA Cropped Tee - Classic Black",
    price: "₱749.00 PHP",
    oldPrice: "₱899.00 PHP",
    image: "/images/image4.jpg",
    soldOut: true,
  },
  {
    id: 3,
    name: "UA Cropped Tee - Elite Members Only Black",
    price: "₱749.00 PHP",
    oldPrice: "₱899.00 PHP",
    image: "/images/image3.jpg",
    soldOut: true,
  },
  {
    id: 4,
    name: "UA Cropped Tee - Elite Members Only White",
    price: "₱749.00 PHP",
    oldPrice: "₱899.00 PHP",
    image: "/images/image1.jpg",
    soldOut: true,
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 border-b relative">
        <div className="text-black font-bold text-xl">
          <Link href="/">ABOVE APPAREL</Link>
        </div>

        {/* Centered Collections Text */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-black font-semibold text-2xl">
          Collections
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

      {/* Collections Section */}
      <section className="p-8">
        <h2 className="text-2xl font-semibold text-black">Cropped Tees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {Collections.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 text-center shadow-md relative overflow-hidden"
            >
              <motion.div
                className="w-full h-48 flex items-center justify-center bg-gray-100 rounded"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  priority
                  className="object-cover rounded transition-transform duration-300"
                />
              </motion.div>
              {item.soldOut && (
                <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full absolute top-2 left-2">
                  Sold out
                </span>
              )}
              <h3 className="text-black mt-4 font-medium">{item.name}</h3>
              {item.oldPrice && <p className="text-gray-500 line-through">{item.oldPrice}</p>}
              <p className="text-black font-bold">{item.price}</p>
            </div>
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
