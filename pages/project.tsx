import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Project = {
  id: string;
  name: string;
  github: string;
  url: string;
  description: string;
  tech: string;
  image: string | false;
};

const projects: Project[] = [
  {
    id: "thanhnam.dev",
    name: "thanhnam.dev",
    github: "https://github.com/ttran293/thanhnam.dev",
    url: "https://thanhnam.dev",
    description: "My personal website built with Next.js and Tailwind CSS.",
    tech: "Next.js, Tailwind CSS",
    image: false,
  },
  {
    id: "wsrylt",
    name: "What's song are you listening to?",
    url: "https://wsrylt.herokuapp.com/",
    github: "https://github.com/ttran293/music-blog",
    description: "Share your song with your friends.",
    tech: "NodeJS, ReactJS, Semantic UI, MongoDB",
    image: "/images/projects/music-blog-homepage.png",
  },
  {
    id: "mr-nobody",
    name: "Mr. Nobody - Interactive Fiction Game",
    url: "https://mr-nobody-game.vercel.app",
    github: "https://github.com/ttran293/mr-nobody-game",
    description:
      "Interactive Fiction Game - CS691 Interactive Fiction and Text Generation Project",
    tech: "ReactJS, Tailwind CSS, AI/LLM, shadcn UI",
    image: "/images/projects/mr-nobody-game.png",
  },
];

const ProjectImage = ({
  src,
  alt,
}: {
  src: string | false;
  alt: string;
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (src === false) {
    return null;
  }

  return (
    <div className="mb-4 w-full max-w-md">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className={`w-full h-auto object-cover rounded-lg transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

const Project: NextPage = () => {
  return (
    <div className="min-h-screen px-6 py-4 md:px-12">
      {/* Header */}
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

      <div className="max-w-4xl mx-auto mt-20 flex gap-16">
        <aside className="hidden md:block w-48 shrink-0">
          <div className="sticky top-20">
            <p className="text-xs text-stone-400 uppercase tracking-wide mb-4">
              On this page
            </p>
            <nav className="space-y-2">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={`#${project.id}`}
                  className="block text-sm text-stone-500 no-underline hover:text-stone-700 transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  {project.name}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 max-w-xl"
        >
          <section className="mb-12">
            <h1 className="text-xl mb-1">Projects</h1>
            <p className="text-sm text-stone-500 mb-6">
              Things I&apos;ve built
            </p>

            <div className="space-y-10">
              {projects.map((project) => (
                <article
                  key={project.id}
                  id={project.id}
                  className={`pb-8 scroll-mt-20${projects[projects.length - 1].id !== project.id ? " border-b border-stone-200" : ""}`}
                >
                  <ProjectImage src={project.image} alt={project.name} />

                  <h3 className="text-base text-stone-900">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.name} ↗
                    </a>
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="text-stone-400">{project.tech}</span>
                    <span className="text-stone-300">·</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-500 hover:text-stone-700"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <hr className="border-stone-300 mb-6" />

          <p className="text-sm text-stone-500 mb-16">
            <Link href="/">← Back to home</Link>
          </p>
        </motion.main>
      </div>
    </div>
  );
};

export default Project;
