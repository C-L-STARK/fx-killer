import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "api.microlink.io"
      },
      {
        hostname: "qingwuwei.github.io"
      },
      {
        hostname: "wlksiulicosdnerzhkdl.supabase.co"
      }
    ]
  },
  // Tell Next.js these packages use native Node.js modules
  serverExternalPackages: ['binance-api-node'],
};

export default nextConfig;
