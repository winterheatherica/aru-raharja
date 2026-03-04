/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9000",
        pathname: "/aru-assets/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/aru-assets/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
    unoptimized: false,
  },
};

module.exports = nextConfig;
