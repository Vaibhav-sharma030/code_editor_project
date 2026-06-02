import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: '',
        pathname: '/**'
      }
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
