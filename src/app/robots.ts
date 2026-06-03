import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Mock dashboards, transactional flows and API routes must not be
        // indexed. Each path is locale-agnostic — Googlebot ignores the
        // /pl/, /en/, etc. prefix when matching disallow patterns, so we
        // list bare paths and use trailing /* for sub-trees.
        disallow: [
          "/api/",
          "/dashboard",
          "/dashboard/",
          "/manager",
          "/manager/",
          "/login",
          "/register",
          "/checkout",
          "/checkout/",
        ],
      },
    ],
    sitemap: "https://academy.bidbidders.com/sitemap.xml",
    host: "https://academy.bidbidders.com",
  };
}
