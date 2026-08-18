import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Lets production builds use a separate dir (NEXT_DIST_DIR=.next-prod) so
  // they never clobber a concurrently running `next dev` (.next).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Emits a self-contained .next/standalone with only the deps actually used
  // at runtime, so the Docker image doesn't need to `npm install` at all.
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
