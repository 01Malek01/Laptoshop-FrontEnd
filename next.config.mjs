/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // You can specify 'http' if needed
        hostname: "*", // Wildcard to allow all domains
      },
    ],
  },
};

export default nextConfig