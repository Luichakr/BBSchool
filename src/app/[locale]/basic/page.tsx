import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
    title: `${t("packages.basic.name")} · ${t("nav.basic")}`,
    description: t("packages.basic.for"),
  };
}

export default async function BasicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const includes = (t.raw as (k: string) => unknown)(
    "packages.basic.includes",
  ) as string[];
  const restrictions = (t.raw as (k: string) => unknown)(
    "packages.basic.restrictions",
  ) as string[];

  return (
    <>
      <PageHeader
        kicker={t("packages.basic.name")}
        title={t("packages.basic.for")}
        subtitle={t("home.hero.subtitle")}
      />

      <Section className="!pt-0">
        <Container className="grid gap-6 md:grid-cols-[2fr_1fr]">
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
                {t("packages.basic.priceNote")}
              </h3>
              <ul className="mt-3 space-y-3">
                {restrictions.map((it, i) => (
                  <li key={i} className="flex gap-3 text-[var(--color-muted)]">
                    <XCircle className="h-5 w-5 mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card className="border-[var(--color-primary)]">
            <CardBody>
              <div className="text-3xl font-bold">{t("packages.basic.price")}</div>
              <div className="text-xs text-[var(--color-muted)]">
                {t("packages.basic.priceNote")}
              </div>
              <Link href="/checkout?package=basic" className="mt-5 block">
                <Button className="w-full" size="lg">
                  {t("cta.buyBasic")}
                </Button>
              </Link>
              <Link href="/pricing" className="mt-3 block">
                <Button variant="outline" className="w-full">
                  {t("pricing.compare")}
                </Button>
              </Link>
              <p className="mt-4 text-xs text-[var(--color-muted)]">
                {t("legal.disclaimer")}
              </p>
            </CardBody>
          </Card>
        </Container>
      </Section>
    </>
  );
}
