import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['img.youtube.com'], // For YouTube thumbnails
    formats: ['image/webp', 'image/avif'],
  },
  // Enable static exports if needed
  // output: 'export',
};

export default nextConfig;
