import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Временные референс-кадры на время демо, см. data/photos.ts.
    // После съёмки производства домен убирается вместе с внешними URL.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
