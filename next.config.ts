import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // unoptimized: true,
    // domains: ["laravelappversionone.beautyden.in"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "laravelappversionone.beautyden.in",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
