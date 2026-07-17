import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // next/image needs this for static export
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;