const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/ttran293/sticker-vending-machine/main/public/stickers/**" }],
  },
  async redirects() {
    return [
      {
        source: "/items/:id",
        destination: "/project/:id",
        permanent: true,
      },
    ];
  },
};

module.exports = (phase) => ({
  ...nextConfig,
  // Keep production builds from replacing chunks used by the running dev server.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});
