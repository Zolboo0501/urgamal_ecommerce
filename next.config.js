/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "m.media-amazon.com",
      "127.0.0.1",
      "api.urga.mn",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
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
  fontLoaders: [
    { loader: "@next/font/google", options: { subsets: ["latin"] } },
  ],
  reactStrictMode: true,
};

module.exports = nextConfig;
