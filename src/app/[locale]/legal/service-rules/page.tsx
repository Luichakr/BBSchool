import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("legal.service") };
}

export default async function ServiceRulesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <LegalPage
      title={t("legal.service")}
      body={[
        "BidBIDDERS provides a guided platform: course, dashboard, calculator, manager-executed bid requests, post-purchase tracking.",
        "Basic and Pro clients submit bid requests through BidBIDDERS.com; the actual bid is executed by a BidBIDDERS manager via the internal Car Auctions tool, within the client's confirmed limit.",
        "Partner-level access requires a separate contract, vetting and deposit.",
        "Auto-in-transit listing applies only to cars purchased through BidBIDDERS; Pro markup is capped at 2000 USD over the agreed base.",
        t("legal.disclaimer"),
      ]}
    />
  );
}
