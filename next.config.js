/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "source.unsplash.com",
      "m.media-amazon.com",
      "127.0.0.1",
      "api.urga.mn",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "test.test.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.urga.mn",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
