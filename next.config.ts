import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Screaming Frog und andere HTML-Parser erhalten Metadaten im <head>
  // statt im Body (Next.js 15.2+ Streaming Metadata)
  htmlLimitedBots: /Screaming Frog SEO Spider|Slackbot|Twitterbot|bingbot|Googlebot|Mediapartners-Google|AdsBot-Google|Google-PageRenderer/i,
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
      // Favicon: Browser und Google nutzen favicon.jpeg
      { source: "/favicon.ico", destination: "/img/favicon.jpeg", permanent: false },
    ];
  },
};

export default nextConfig;
