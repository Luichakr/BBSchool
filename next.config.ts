import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.bidbidders.com" },
    ],
  },
  // Canonical host redirects — keep www.* → apex (academy.bidbidders.com).
  // Required so that the P24 verifier opening www.academy.bidbidders.com
  // lands on the working site.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.academy.bidbidders.com" }],
        destination: "https://academy.bidbidders.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
