import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.admmeters.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Ensure video files support byte-range requests (required for currentTime seeking)
  async headers() {
    return [
      {
        source: "/:path*.mp4",
        headers: [
          { key: "Accept-Ranges", value: "bytes" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
