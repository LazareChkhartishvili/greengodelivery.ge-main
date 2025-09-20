import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "greengo-api-production.up.railway.app",
        port: "",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
