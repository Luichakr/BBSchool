import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("legal.payment") };
}

export default async function PaymentTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <LegalPage
      title={t("legal.payment")}
      body={[
        "Package price (Basic, Pro) is paid up-front. Refund policy applies only to the access fee, not to executed bid wins.",
        "Auction win, auction fees, shipping, customs, taxes, repair and document costs are paid separately according to each invoice.",
        "Late payment for an executed win may result in lot forfeiture and auction penalties; BidBIDDERS forwards the original auction conditions.",
        t("legal.disclaimer"),
      ]}
    />
  );
}
