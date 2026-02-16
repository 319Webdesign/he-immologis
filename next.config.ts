import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/logistik", destination: "/logistikberatung", permanent: true },
    ];
  },
};

export default nextConfig;
