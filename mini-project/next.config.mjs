/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.antaranews.com",
      },
    ],
  },
};

export default nextConfig;
