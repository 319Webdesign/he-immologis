import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.onoffice.de",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.onoffice.de",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "smart.onoffice.de",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/logistik", destination: "/logistikberatung", permanent: true },
      // Favicon: Browser lädt logo.png für alle Tabs
      { source: "/favicon.ico", destination: "/img/logo.png", permanent: false },
    ];
  },
};

export default nextConfig;
