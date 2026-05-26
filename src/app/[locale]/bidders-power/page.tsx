import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/sections/PageHeader";
import { CheckCircle2, XCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("biddersPower.title"),
    description: t("biddersPower.subtitle"),
  };
}

export default async function BiddersPowerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const rules = (t.raw as (k: string) => unknown)(
    "biddersPower.rules",
  ) as string[];
  const tiers = (t.raw as (k: string) => unknown)(
    "biddersPower.tiers",
  ) as { count: number; discount: string }[];
  const notCovered = (t.raw as (k: string) => unknown)(
    "biddersPower.notCovered.items",
  ) as string[];

  return (
    <>
      <PageHeader title={t("biddersPower.title")} subtitle={t("biddersPower.subtitle")} />
      <Section className="!pt-0">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">Rules</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {rules.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">Tiers</h2>
              <ul className="mt-4 space-y-3">
                {tiers.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <span className="font-medium">{t.count} Power</span>
                    <span className="text-sm text-[var(--color-muted)]">
                      {t.discount}
                    </span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
        <Container className="mt-6">
          <Card className="bg-red-50 border-red-200">
            <CardBody>
              <h3 className="font-semibold text-[var(--color-danger)]">
                {t("biddersPower.notCovered.title")}
              </h3>
              <ul className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {notCovered.map((x, i) => (
                  <li key={i} className="flex gap-2">
                    <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    {x}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <p className="mt-6 text-xs text-[var(--color-muted)]">
            {t("legal.disclaimer")}
          </p>
        </Container>
      </Section>
    </>
  );
}
