import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop.doseofproof.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons", "@radix-ui/react-slot"],
  },
  async rewrites() {
    return [
      {
        source: "/shop",
        destination: "https://shop.doseofproof.com",
      },
      {
        source: "/shop/:path*",
        destination: "https://shop.doseofproof.com/:path*",
      },
    ];
  },
};

export default nextConfig;
