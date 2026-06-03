import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactWidget } from "@/components/layout/ContactWidget";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  // Academy lives on its own subdomain — metadataBase, OG url and the
  // sitemap host all must point here, NOT to the main bidbidders.com.
  const url = "https://academy.bidbidders.com";
  return {
    metadataBase: new URL(url),
    title: { default: t("siteName"), template: `%s · ${t("siteName")}` },
    description: t("siteTagline"),
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    themeColor: "#FF5C00",
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]).concat([["x-default", "/pl"]]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("siteName"),
      description: t("siteTagline"),
      url: `${url}/${locale}`,
      locale,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteName"),
      description: t("siteTagline"),
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  // Schema.org graph:
  //  - Organization = the parent business BidBIDDERS (lives on main domain)
  //  - WebSite      = the academy sub-site itself (this subdomain), linked
  //    back to the org as publisher. Keeping the org @id on bidbidders.com
  //    is intentional so Google sees academy as a property of the brand,
  //    not a separate company.
  // Schema.org graph that unifies the brand across two subdomains:
  //  - Organization (BidBIDDERS) — same @id as the main site, listing both
  //    subdomains in sameAs so Google links them as one entity.
  //  - WebSite (the academy itself) — publisher → main org.
  //  - subOrganization (Academy as EducationalOrganization) — mirrors the
  //    subOrganization declared on the main site's home page.
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://bidbidders.com#org",
        name: "BidBIDDERS",
        url: "https://bidbidders.com",
        sameAs: [
          "https://academy.bidbidders.com",
          "https://www.instagram.com/bidderscom",
          "https://www.tiktok.com/@bidders.com",
        ],
        subOrganization: {
          "@type": "EducationalOrganization",
          "@id": "https://academy.bidbidders.com/#academy",
          name: "BidBIDDERS Academy",
          url: "https://academy.bidbidders.com",
        },
      },
      {
        "@type": "WebSite",
        "@id": `https://academy.bidbidders.com/${locale}#site`,
        url: `https://academy.bidbidders.com/${locale}`,
        name: "BidBIDDERS Academy",
        inLanguage: locale,
        publisher: { "@id": "https://bidbidders.com#org" },
      },
    ],
  };

  return (
    <html lang={locale} className={manrope.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ContactWidget />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </body>
    </html>
  );
}
