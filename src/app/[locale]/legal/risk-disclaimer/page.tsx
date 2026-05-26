import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("legal.risk") };
}

export default async function RiskPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <LegalPage
      title={t("legal.risk")}
      body={[
        "Buying a car at auction always carries risk. The car can have hidden mechanical, structural or electronic defects beyond what is disclosed in the lot description.",
        "Calculator outputs are indicative only. Final cost depends on shipping rates, customs decisions, currency rates and repair scope.",
        "BidBIDDERS executes bid requests within the client's confirmed limit but does not guarantee winning a specific lot or a specific profit on resale.",
        "BidBIDDERS may refuse a bid request when the risk profile (VIN history, lot description, structural damage, regulatory issues) is materially adverse.",
        t("legal.disclaimer"),
      ]}
    />
  );
}
