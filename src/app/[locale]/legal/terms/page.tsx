import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("legal.terms") };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <LegalPage
      title={t("legal.terms")}
      body={[
        t("legal.disclaimer"),
        t("carAuctions.explainer"),
        t("autoWDrodze.disclaimer"),
        "This document is a mock placeholder. Replace with the actual legal text before launch.",
      ]}
    />
  );
}
