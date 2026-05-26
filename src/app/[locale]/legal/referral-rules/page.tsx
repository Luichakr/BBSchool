import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("legal.referral") };
}

export default async function ReferralPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const rules = (t.raw as (k: string) => unknown)("biddersPower.rules") as string[];
  const notCovered = (t.raw as (k: string) => unknown)("biddersPower.notCovered.items") as string[];
  return (
    <LegalPage
      title={t("legal.referral")}
      body={[
        t("biddersPower.subtitle"),
        ...rules,
        `${t("biddersPower.notCovered.title")} ${notCovered.join(", ")}.`,
        "BIDDERS Power is a single-level program. Power is not cash, not sold separately and not transferable.",
        t("legal.disclaimer"),
      ]}
    />
  );
}
