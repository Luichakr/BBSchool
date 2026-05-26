import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("legal.cookies") };
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <LegalPage
      title={t("legal.cookies")}
      body={[
        "We use only cookies necessary for the service (session, locale) and minimal analytics for product improvement.",
        "You can disable non-essential cookies in your browser settings without losing core functionality.",
        "This document is a mock placeholder.",
        t("legal.disclaimer"),
      ]}
    />
  );
}
