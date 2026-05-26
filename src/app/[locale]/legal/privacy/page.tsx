import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("legal.privacy") };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <LegalPage
      title={t("legal.privacy")}
      body={[
        "BidBIDDERS processes personal data only for fulfilling the service: package access, bid requests, purchase tracking, communication.",
        "Data is stored in the EU. Clients can request export or deletion via support.",
        "This document is a mock placeholder. Replace with the actual GDPR-compliant policy before launch.",
        t("legal.disclaimer"),
      ]}
    />
  );
}
