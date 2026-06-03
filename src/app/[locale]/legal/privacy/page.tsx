import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { CONTACTS } from "@/data/contacts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("legalDocs.privacy.title") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = CONTACTS.company;
  const sections = (t.raw as (k: string) => unknown)(
    "legalDocs.privacy.sections",
  ) as LegalSection[];

  return (
    <LegalPage
      title={t("legalDocs.privacy.title")}
      updated={t("legalDocs.updated")}
      company={{
        title: t("legalDocs.companyTitle"),
        legalName: c.legalNameFull,
        nip: c.nip || undefined,
        nipLabel: t("legalDocs.nipLabel"),
        regon: c.regon || undefined,
        regonLabel: t("legalDocs.regonLabel"),
        krs: c.krs || undefined,
        krsLabel: t("legalDocs.krsLabel"),
        registeredLabel: t("legalDocs.registeredLabel"),
        registeredAddress: c.registeredAddress,
        visitLabel: t("legalDocs.visitLabel"),
        visitAddress: `${CONTACTS.carAuctionsPoland.addressLine1}, ${CONTACTS.carAuctionsPoland.addressLine2}`,
        visitNote: t("legalDocs.visitNote"),
        email: c.email,
        phone: c.phone,
      }}
      sections={sections}
    />
  );
}
