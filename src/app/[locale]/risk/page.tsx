import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  AlertTriangle,
  ShieldCheck,
  User,
  XCircle,
  Flame,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("risk.title"),
    description: t("risk.subtitle"),
  };
}

type RawT = (k: string) => unknown;

export default async function RiskPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = t.raw as RawT;
  const existing = raw("risk.existing.items") as string[];
  const ourSide = raw("risk.ourSide.items") as string[];
  const clientSide = raw("risk.clientSide.items") as string[];
  const noGuarantee = raw("risk.noGuarantee.items") as string[];

  return (
    <>
      <PageHeader title={t("risk.title")} subtitle={t("risk.subtitle")} />
      <Section className="!pt-0">
        <Container className="grid gap-6 md:grid-cols-2">
          <Card className="bg-red-50/40 border-red-100">
            <CardBody>
              <div className="flex items-baseline gap-3">
                <AlertTriangle className="h-6 w-6 text-[var(--color-danger)]" />
                <h2 className="text-xl font-semibold">
                  {t("risk.existing.title")}
                </h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {existing.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--color-danger)] mt-1">•</span>
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex items-baseline gap-3">
                <ShieldCheck className="h-6 w-6 text-[var(--color-success)]" />
                <h2 className="text-xl font-semibold">
                  {t("risk.ourSide.title")}
                </h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {ourSide.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--color-success)] mt-1">•</span>
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex items-baseline gap-3">
                <User className="h-6 w-6 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">
                  {t("risk.clientSide.title")}
                </h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {clientSide.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--color-primary)] mt-1">•</span>
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex items-baseline gap-3">
                <XCircle className="h-6 w-6 text-[var(--color-muted)]" />
                <h2 className="text-xl font-semibold">
                  {t("risk.noGuarantee.title")}
                </h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {noGuarantee.map((it, i) => (
                  <li key={i} className="flex gap-2 text-[var(--color-muted)]">
                    <span className="mt-1">•</span>
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl space-y-6">
          <Card className="bg-amber-50 border-amber-200">
            <CardBody>
              <div className="flex items-baseline gap-3">
                <Flame className="h-6 w-6 text-[var(--color-warning)]" />
                <h2 className="text-xl font-semibold">
                  {t("risk.emotions.title")}
                </h2>
              </div>
              <p className="mt-3 text-[var(--color-muted)]">
                {t("risk.emotions.body")}
              </p>
            </CardBody>
          </Card>

          <Card className="border-[var(--color-border)]">
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("risk.legalDisclaimer.title")}
              </h2>
              <p className="mt-3 text-[var(--color-muted)] text-sm leading-relaxed">
                {t("risk.legalDisclaimer.body")}
              </p>
            </CardBody>
          </Card>

          <p className="text-xs text-[var(--color-muted)]">
            {t("legal.disclaimer")}
          </p>
        </Container>
      </Section>
    </>
  );
}
