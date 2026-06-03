import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { PageHeader } from "@/components/sections/PageHeader";
import { PackageCard } from "@/components/sections/PackageCard";
import { XCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("pricing.title"),
    description: t("pricing.subtitle"),
  };
}

type RawT = (k: string) => unknown;

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = t.raw as RawT;

  const decisionItems = raw("pricing.decision.items") as {
    if: string;
    then: string;
  }[];
  const decisionByGoal = raw("pricingExtras.decisionByGoal") as {
    goal: string;
    answer: string;
  }[];
  const rows = raw("pricing.rows") as {
    name: string;
    basic: string;
    pro: string;
    partner: string;
  }[];
  const notIncluded = raw("pricing.notIncluded") as string[];
  const pricingFaq = raw("pricing.faq") as { q: string; a: string }[];

  return (
    <>
      <PageHeader
        title={t("pricing.title")}
        subtitle={t("pricing.subtitle")}
      />

      {/* DECISION BLOCK */}
      <Section className="!pt-0">
        <Container>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("pricing.decision.title")}
              </h2>
              <ul className="mt-4 divide-y divide-[var(--color-border)]">
                {decisionItems.map((it, i) => (
                  <li
                    key={i}
                    className="grid gap-2 md:grid-cols-[1fr_2fr] py-3 first:pt-0 last:pb-0"
                  >
                    <div className="text-sm font-medium">{it.if}</div>
                    <div className="text-sm text-[var(--color-muted)]">
                      → {it.then}
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* DECISION BY GOAL */}
      <Section className="!pt-0">
        <Container>
          <Card className="bg-[var(--color-accent-soft)] border-[var(--color-accent-soft)]">
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("pricingExtras.decisionByGoalTitle")}
              </h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {decisionByGoal.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white border border-[var(--color-border)] p-4"
                  >
                    <span className="text-sm">{it.goal}</span>
                    <Badge variant="primary">{it.answer}</Badge>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* MAIN PACKAGES */}
      <Section className="!pt-0">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <PackageCard id="basic" />
            <PackageCard id="pro" highlight />
            <PackageCard id="partner" />
          </div>
        </Container>
      </Section>

      {/* COMPARISON TABLE */}
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("pricing.compare")}
          </h2>
          <Card className="mt-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-left bg-[var(--color-bg)]">
                    <th className="p-4 font-medium">
                      {t("pricing.columns.feature")}
                    </th>
                    <th className="p-4 font-medium">
                      {t("pricing.columns.basic")}
                    </th>
                    <th className="p-4 font-medium">
                      {t("pricing.columns.pro")}
                    </th>
                    <th className="p-4 font-medium">
                      {t("pricing.columns.partner")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-[var(--color-border)] last:border-none"
                    >
                      <td className="p-4 font-medium">{r.name}</td>
                      <td className="p-4 text-[var(--color-muted)]">
                        {r.basic}
                      </td>
                      <td className="p-4 text-[var(--color-muted)]">{r.pro}</td>
                      <td className="p-4 text-[var(--color-muted)]">
                        {r.partner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Container>
      </Section>

      {/* NOT INCLUDED */}
      <Section>
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("pricing.notIncludedTitle")}
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {notIncluded.map((it, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl border border-red-100 bg-red-50/40 p-4 text-sm"
              >
                <XCircle className="h-5 w-5 text-[var(--color-danger)] shrink-0 mt-0.5" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* WHY NOT CHEAP */}
      <Section className="bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("pricingExtras.whyNotCheapTitle")}
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            {t("pricingExtras.whyNotCheap")}
          </p>
        </Container>
      </Section>

      {/* PRICING FAQ */}
      <Section className="bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("pricing.faqTitle")}
          </h2>
          <div className="mt-6">
            <Accordion items={pricingFaq} />
          </div>
          <p className="mt-6 text-xs text-[var(--color-muted)]">
            {t("legal.disclaimer")}
          </p>
        </Container>
      </Section>
    </>
  );
}
