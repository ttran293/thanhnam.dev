import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion";

const Home: NextPage = () => {
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
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto mt-20"
      >
        {/* About Section */}
        <section className="mb-12">
          <h1 className="text-xl mb-1">About Nam</h1>
          {/* <p className="text-sm text-stone-500 mb-6">b. 1997</p> */}

          <p className="text-stone-600 leading-relaxed mb-4 text-sm">
            I&apos;m a Software Developer at{" "}
            <a
              href="https://mediacy.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Media Cybernetics Inc. ↗
            </a>{" "}
            and a Graduate Student and Assistant at{" "}
            <a
              href="https://www.umbc.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UMBC ↗
            </a>{" "}
            .
          </p>

          <p className="text-stone-600 leading-relaxed text-sm">
            I&apos;m passionate about building solutions and exploring new
            technologies. <br /> Currently, I&apos;m focused on AI/ML/NLP.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg text-stone-700 mb-4">Hobbies</h2>
          <div className="grid grid-cols-2 gap-x-8 text-sm">
            <ul>
              <li>
                <Link href="/project">Projects I&apos;ve built</Link>
              </li>
              <li>
                <Link href="/drawing">Drawings</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href="/climb">Rock Climbing</Link>
              </li>
              <li>Wood Whittling (Soon)</li>
            </ul>
          </div>
        </section>

        {/* Contact me */}
        <section className="mb-12">
          <h2 className="text-lg text-stone-700 mb-4">Contact me</h2>
          <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm">
            <ul>
              <li>
                <a href="mailto:ttran19@umbc.edu">Email me ↗</a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="https://github.com/ttran293"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="https://linkedin.com/in/thanh-nam-tran-9bbb921b3/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="https://github.com/ttran293/ttran293/blob/main/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume ↗
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-stone-300 mb-6" />

        {/* Updated date */}
        <p className="text-xs text-stone-400 mb-16">
          Updated December 30, 2025
        </p>
      </motion.main>
    </div>
  );
};

export default Home;
