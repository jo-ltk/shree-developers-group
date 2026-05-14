import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        type: "raw",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /raw/,
      type: "asset/source",
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.unsplash.com https://res.cloudinary.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self'; media-src 'self' https://res.cloudinary.com;",
          },
        ],
      },
    ];
  },
  allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.1.39'],
};

export default nextConfig;
