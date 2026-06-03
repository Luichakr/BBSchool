import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

// Academy is its own site at academy.bidbidders.com. Sitemap URLs and the
// robots.ts sitemap pointer must use THIS host, not the main bidbidders.com.
const BASE = "https://academy.bidbidders.com";

// Indexable, public marketing/content routes only. Login/register/checkout
// and the mock dashboard/manager are intentionally excluded — see robots.ts.
const PUBLIC_PATHS = [
  "",
  "/basic",
  "/pro",
  "/partner",
  "/pricing",
  "/how-it-works",
  "/course",
  "/what-inside",
  "/calculator",
  "/auto-w-drodze",
  "/bidders-power",
  "/car-auctions",
  "/faq",
  "/about",
  "/contact",
  "/risk",
  "/legal/terms",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/risk-disclaimer",
  "/legal/referral-rules",
  "/legal/payment-terms",
  "/legal/service-rules",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.flatMap((p) =>
    routing.locales.map((l) => ({
      url: `${BASE}/${l}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((other) => [other, `${BASE}/${other}${p}`]),
        ),
      },
    })),
  );
}
