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
};

export default nextConfig;
