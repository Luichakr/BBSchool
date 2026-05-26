import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/sections/PageHeader";
import { LeadForm } from "@/components/forms/LeadForm";
import { CheckCircle2, XCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("packages.partner.name")} · ${t("nav.partner")}`,
    description: t("packages.partner.for"),
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const includes = (t.raw as (k: string) => unknown)(
    "packages.partner.includes",
  ) as string[];
  const restrictions = (t.raw as (k: string) => unknown)(
    "packages.partner.restrictions",
  ) as string[];

  return (
    <>
      <PageHeader
        kicker={t("packages.partner.name")}
        title={t("packages.partner.for")}
        subtitle={t("carAuctions.subtitle")}
      />
      <Section className="!pt-0">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">{t("common.all")}</h2>
              <ul className="mt-4 space-y-3">
                {includes.map((it, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-success)] mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-lg font-semibold">
                {t("packages.partner.priceNote")}
              </h3>
              <ul className="mt-3 space-y-3">
                {restrictions.map((it, i) => (
                  <li key={i} className="flex gap-3 text-[var(--color-muted)]">
                    <XCircle className="h-5 w-5 mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-[var(--color-muted)]">
                {t("legal.disclaimer")}
              </p>
            </CardBody>
          </Card>
          <LeadForm
            defaults={{ requestType: "partner", packageInterest: "partner" }}
            sourcePage="/partner"
            thankYouPath="/partner/thank-you"
          />
        </Container>
      </Section>
    </>
  );
}
