import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
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
