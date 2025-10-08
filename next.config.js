/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.youtube.com", "i.ytimg.com"],
  },

  async rewrites() {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    if (!API_BASE) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${API_BASE}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
