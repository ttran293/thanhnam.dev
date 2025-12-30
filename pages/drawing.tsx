import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type DrawingItem = {
  id: string;
  src: string;
  alt: string;
};

const drawings: DrawingItem[] = [
  { id: "1", src: "/images/drawings/1.jpg", alt: "Drawing 1" },
  { id: "3", src: "/images/drawings/3.jpg", alt: "Drawing 3" },
  { id: "4", src: "/images/drawings/4.jpg", alt: "Drawing 4" },
  { id: "5", src: "/images/drawings/5.jpg", alt: "Drawing 5" },
  { id: "7", src: "/images/drawings/7.JPG", alt: "Drawing 7" },
  { id: "8", src: "/images/drawings/8.JPG", alt: "Drawing 8" },
  { id: "10", src: "/images/drawings/10.JPG", alt: "Drawing 10" },
  { id: "11", src: "/images/drawings/11.JPG", alt: "Drawing 11" },
  { id: "12", src: "/images/drawings/12.JPG", alt: "Drawing 12" },
  { id: "13", src: "/images/drawings/13.PNG", alt: "Drawing 13" },
  { id: "14", src: "/images/drawings/14.JPG", alt: "Drawing 14" },
  { id: "15", src: "/images/drawings/15.JPG", alt: "Drawing 15" },
  { id: "16", src: "/images/drawings/16.JPG", alt: "Drawing 16" },
  { id: "17", src: "/images/drawings/17.JPG", alt: "Drawing 17" },
  { id: "18", src: "/images/drawings/18.JPG", alt: "Drawing 18" },
  { id: "19", src: "/images/drawings/19.JPG", alt: "Drawing 19" },
  { id: "20", src: "/images/drawings/20.JPG", alt: "Drawing 20" },
  { id: "21", src: "/images/drawings/21.JPG", alt: "Drawing 21" },
  { id: "22", src: "/images/drawings/22.jpg", alt: "Drawing 22" },
  { id: "23", src: "/images/drawings/23.jpg", alt: "Drawing 23" },
  { id: "24", src: "/images/drawings/24.jpg", alt: "Drawing 24" },
];

const DrawingImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="relative w-full bg-stone-200">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={500}
        className={`w-full h-auto transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center min-h-48">
          <span className="text-stone-400 text-xs">Loading...</span>
        </div>
      )}
    </div>
  );
};

const Drawing: NextPage = () => {
  return (
    <div className="min-h-screen px-6 py-4 md:px-12">
      <header className="flex justify-between items-center mb-16">
        <Link
          href="/"
          className="text-stone-700 no-underline hover:text-stone-900 text-sm"
          style={{ textDecoration: "none" }}
        >
          Thanh Nam
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link
            href="/"
            className="text-stone-500 no-underline hover:text-stone-700"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
        </nav>
      </header>

      {/* Masonry Grid */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {drawings.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="mb-2 break-inside-avoid"
            >
              <DrawingImage src={item.src} alt={item.alt} />
            </motion.div>
          ))}
        </div>
      </motion.main>

      <p className="text-sm text-stone-500 mb-16 mt-16">
        <Link href="/">← Back to home</Link>
      </p>
    </div>
  );
};

export default Drawing;
