/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

module.exports = nextConfig;
