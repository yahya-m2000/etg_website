import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: [
     "picsum.photos", "images.pexels.com", "images.ctfassets.net"
    ]
  }
};

export default nextConfig;
