import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion";

const YouTubeEmbed = ({ videoId, title }: { videoId: string; title?: string }) => (
  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title || "YouTube video"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 w-full h-full"
    />
  </div>
);

const Climb: NextPage = () => {
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

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto mt-20"
      >
        <section className="mb-12">
          <h1 className="text-xl mb-1">Rock Climbing</h1>
          <p className="text-sm text-stone-500 mb-6">Indoor and Outdoor</p>

          <p className="text-stone-600 leading-relaxed mb-8 text-base">
            I started climbing in 09/2023. I have been on and off climbing
            usually 1-2 times a week. I got couple of injuries.{" "}
          </p>

          <div className="space-y-8">
            <article className="border-b border-stone-200 pb-6">
              <h3 className="text-base text-stone-700 mb-4">
                Current Milestones
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-stone-400 text-xs mb-1">
                    Indoor Bouldering
                  </p>
                  <p className="text-stone-600">V4-V5 (Hardest sent: V6)</p>
                </div>
                <div>
                  <p className="text-stone-400 text-xs mb-1">Top Rope</p>
                  <p className="text-stone-600">5.10c</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs mt-3">
                <a
                  href="https://kaya-app.kayaclimb.com/user/nam."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-stone-700 underline"
                >
                  Kaya ↗
                </a>
                <a
                  href="https://www.mountainproject.com/user/202031908/nam-tran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-stone-700 underline"
                >
                  Mountain Project ↗
                </a>
              </div>
            </article>

            <article className="border-b border-stone-200 pb-6">
              <h3 className="text-base text-stone-700 mb-2">Recent Sessions</h3>
              <ul className="text-sm text-stone-600 space-y-2">
                <li>Rehab wrist and ankle injuries</li>
                <li>Improve max hang and max pull up</li>
              </ul>
            </article>

            <article className="pb-6">
              <h3 className="text-base text-stone-700 mb-4">Sent Climbs</h3>

              <YouTubeEmbed
                videoId="B0H3y-fP4R0"
                title="Northwest Branch Bouldering"
              />

              <YouTubeEmbed
                videoId="Y21KHSb2jz8"
                title="Northwest Branch Bouldering"
              />
            </article>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-stone-300 mb-6" />

        {/* Back link */}
        <p className="text-sm text-stone-500 mb-16">
          <Link href="/">← Back to home</Link>
        </p>
      </motion.main>
    </div>
  );
};

export default Climb;

