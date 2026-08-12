import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Firebase Admin runs only in Node.js server code. Keeping it external makes
  // Vercel load its supported CommonJS entry point rather than an ESM facade.
  serverExternalPackages: ["firebase-admin"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "diginfoexpert.com",
          },
        ],
        destination: "https://diginfo.ai/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
