/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "via.placeholder.com",
      "images.ctfassets.net",
      "images.unsplash.com",
      "source.unsplash.com",
      "picsum.photos"
    ],
  },
};

export default nextConfig;
