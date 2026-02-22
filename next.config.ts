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
      // Favicon: Browser lädt Logo.svg für alle Tabs (auch PDF-Downloads)
      { source: "/favicon.ico", destination: "/img/Logo.svg", permanent: false },
    ];
  },
};

export default nextConfig;
