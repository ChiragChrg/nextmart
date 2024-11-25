import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: 'https',
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: 'http',
        hostname: "via.placeholder.com",
      },
      {
        protocol: 'https',
        hostname: "placehold.co",
      },
    ],
  }
};

export default nextConfig;
