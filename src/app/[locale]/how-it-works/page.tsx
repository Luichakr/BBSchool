import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Package as PackageIcon,
  KeyRound,
  GraduationCap,
  Car,
  Calculator,
  Gavel,
  Eye,
  Truck,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("howItWorksDeep.title"),
    description: t("howItWorksDeep.subtitle"),
  };
}

type RawT = (k: string) => unknown;

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = t.raw as RawT;

  const summary = raw("howItWorksDeep.summary") as string[];
  const stagePackage = raw(
    "howItWorksDeep.stagePackage.items",
  ) as { name: string; desc: string }[];
  const stageAccessItems = raw("howItWorksDeep.stageAccess.items") as string[];
  const stageRequiredItems = raw(
    "howItWorksDeep.stageRequired.items",
  ) as string[];
  const stageCarItems = raw("howItWorksDeep.stageCar.items") as string[];
  const stageMaxBidFormula = raw(
    "howItWorksDeep.stageMaxBid.formula",
  ) as string[];
  const stageRequestItems = raw(
    "howItWorksDeep.stageRequest.items",
  ) as { tier: string; desc: string }[];
  const managerCheckItems = raw(
    "howItWorksDeep.managerCheck.items",
  ) as string[];
  const afterWinItems = raw("howItWorksDeep.afterWin.items") as string[];
  const wrongItems = raw("howItWorksDeep.wrongItems") as string[];
  const hwFaq = raw("howItWorksDeep.faq") as { q: string; a: string }[];

  return (
    <>
      <PageHeader
        kicker={t("nav.howItWorks")}
        title={t("howItWorksDeep.title")}
        subtitle={t("howItWorksDeep.subtitle")}
      />

      {/* SUMMARY */}
      <Section className="!pt-0">
        <Container>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("howItWorksDeep.summaryTitle")}
              </h2>
              <ol className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm">
                {summary.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-lg bg-[var(--color-bg)] p-3"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold shrink-0">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* STAGE 1 — package */}
      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <Badge variant="primary">1</Badge>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">
              {t("howItWorksDeep.stagePackage.title")}
            </h2>
            <PackageIcon className="mt-4 h-10 w-10 text-[var(--color-primary)]" />
            <div className="mt-6">
              <Link href="/pricing">
                <Button>
                  {t("howItWorksDeep.stagePackage.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {stagePackage.map((p, i) => (
              <li
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4"
              >
                <div className="font-semibold">{p.name}</div>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {p.desc}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* STAGE 2 — access */}
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <Badge variant="primary">2</Badge>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">
              {t("howItWorksDeep.stageAccess.title")}
            </h2>
            <KeyRound className="mt-4 h-10 w-10 text-[var(--color-primary)]" />
            <p className="mt-4 text-[var(--color-muted)]">
              {t("howItWorksDeep.stageAccess.lede")}
            </p>
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {stageAccessItems.map((it, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg bg-white border border-[var(--color-border)] p-3 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* STAGE 3 — required lessons */}
      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <Badge variant="primary">3</Badge>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">
              {t("howItWorksDeep.stageRequired.title")}
            </h2>
            <GraduationCap className="mt-4 h-10 w-10 text-[var(--color-primary)]" />
            <p className="mt-4 text-[var(--color-muted)]">
              {t("howItWorksDeep.stageRequired.lede")}
            </p>
          </div>
          <ul className="space-y-2">
            {stageRequiredItems.map((it, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-lg bg-amber-50 border border-amber-100 p-3 text-sm"
              >
                <Badge variant="warning">required</Badge>
                <span className="font-medium">{it}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* STAGE 4 — car */}
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <Badge variant="primary">4</Badge>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">
              {t("howItWorksDeep.stageCar.title")}
            </h2>
            <Car className="mt-4 h-10 w-10 text-[var(--color-primary)]" />
            <p className="mt-4 text-[var(--color-muted)]">
              {t("howItWorksDeep.stageCar.lede")}
            </p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {stageCarItems.map((it, i) => (
              <li
                key={i}
                className="rounded-lg bg-white border border-[var(--color-border)] px-3 py-2 text-sm"
              >
                {it}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* STAGE 5 — max bid */}
      <Section className="bg-[var(--color-dark)] text-white">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <Badge variant="dark" className="bg-white/10 text-white">5</Badge>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">
              {t("howItWorksDeep.stageMaxBid.title")}
            </h2>
            <Calculator className="mt-4 h-10 w-10 text-[var(--color-accent)]" />
            <p className="mt-5 text-[var(--color-dark-muted)] text-lg max-w-xl">
              {t("howItWorksDeep.stageMaxBid.definition")}
            </p>
          </div>
          <Card className="bg-white/5 border border-white/10">
            <CardBody>
              <h3 className="font-semibold text-white">
                {t("howItWorksDeep.stageMaxBid.formulaTitle")}
              </h3>
              <ol className="mt-3 space-y-1.5 font-mono text-sm text-[var(--color-dark-muted)]">
                {stageMaxBidFormula.map((line, i) => (
                  <li
                    key={i}
                    className={
                      i === stageMaxBidFormula.length - 1
                        ? "text-white font-bold border-t border-white/20 pt-2 mt-2"
                        : ""
                    }
                  >
                    {line}
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* STAGE 6 — bid request */}
      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <Badge variant="primary">6</Badge>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">
              {t("howItWorksDeep.stageRequest.title")}
            </h2>
            <Gavel className="mt-4 h-10 w-10 text-[var(--color-primary)]" />
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {stageRequestItems.map((it, i) => (
              <li
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4"
              >
                <Badge variant="primary">{it.tier}</Badge>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  {it.desc}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* MANAGER CHECK */}
      <Section>
        <Container>
          <div className="flex items-baseline gap-3">
            <Eye className="h-6 w-6 text-[var(--color-primary)]" />
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("howItWorksDeep.managerCheck.title")}
            </h2>
          </div>
          <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {managerCheckItems.map((it, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-xl bg-white border border-[var(--color-border)] p-4 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* AFTER WIN */}
      <Section className="bg-white">
        <Container>
          <div className="flex items-baseline gap-3">
            <Truck className="h-6 w-6 text-[var(--color-primary)]" />
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("howItWorksDeep.afterWin.title")}
            </h2>
          </div>
          <ol className="mt-6 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {afterWinItems.map((it, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-lg bg-[var(--color-bg)] p-3 text-sm"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold shrink-0">
                  {i + 1}
                </span>
                {it}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* WRONG */}
      <Section>
        <Container>
          <div className="flex items-baseline gap-3">
            <ShieldAlert className="h-6 w-6 text-[var(--color-danger)]" />
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("howItWorksDeep.wrongTitle")}
            </h2>
          </div>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {wrongItems.map((it, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50/40 p-4 text-sm"
              >
                <AlertTriangle className="h-4 w-4 text-[var(--color-danger)] mt-0.5 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg font-medium max-w-2xl">
            {t("howItWorksDeep.wrongConclusion")}
          </p>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">{t("faq.title")}</h2>
          <div className="mt-6">
            <Accordion items={hwFaq} />
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-[var(--color-dark)] text-white">
        <Container className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("home.finalCta.title")}
          </h2>
          <p className="mt-3 text-[var(--color-dark-muted)]">
            {t("home.finalCta.subtitle")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link href="/pricing">
              <Button size="lg" variant="accent">
                {t("home.finalCta.primary")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/20 hover:bg-white/10"
              >
                {t("home.finalCta.secondary")}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
