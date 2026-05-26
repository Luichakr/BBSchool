import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  CheckCircle2,
  ListChecks,
  Layers,
  ClipboardList,
  Calculator as CalcIcon,
  FileText,
  ShieldAlert,
  LifeBuoy,
  Square,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("whatInsidePage.title"),
    description: t("whatInsidePage.subtitle"),
  };
}

type RawT = (k: string) => unknown;

const CARD_ICONS = [
  ListChecks,
  Layers,
  ClipboardList,
  CalcIcon,
  FileText,
  ShieldAlert,
  LifeBuoy,
];

export default async function WhatInsidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = t.raw as RawT;

  const cards = raw("whatInsidePage.blocks.studentGets.items") as {
    title: string;
    items: string[];
  }[];
  const lessonBullets = raw(
    "whatInsidePage.blocks.lessonExampleBullets",
  ) as string[];
  const checklist = raw("whatInsidePage.blocks.checklist") as string[];
  const afterItems = raw("whatInsidePage.blocks.afterItems") as string[];

  return (
    <>
      <PageHeader
        kicker={t("whatInsidePage.kicker")}
        title={t("whatInsidePage.title")}
        subtitle={t("whatInsidePage.subtitle")}
      />

      {/* HERO CTAs */}
      <Section className="!pt-0">
        <Container>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing">
              <Button size="lg">{t("whatInsidePage.primaryCta")}</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                {t("whatInsidePage.secondaryCta")}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* WHAT STUDENT GETS */}
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("whatInsidePage.blocks.studentGets.title")}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => {
              const Icon = CARD_ICONS[i] ?? ListChecks;
              return (
                <Card key={i}>
                  <CardBody>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-primary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 font-semibold">{c.title}</h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-muted)]">
                      {c.items.map((x, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-[var(--color-primary)] mt-1">
                            •
                          </span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* LESSON EXAMPLE + CHECKLIST */}
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardBody>
              <Badge variant="primary">
                {t("whatInsidePage.blocks.lessonExampleTitle")}
              </Badge>
              <h2 className="mt-3 text-xl font-bold">
                {t("whatInsidePage.blocks.lessonExampleName")}
              </h2>
              <div className="mt-4 aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white/70">
                ▶ {t("whatInsidePage.blocks.lessonExampleName")}
              </div>
              <ul className="mt-4 space-y-1.5 text-sm">
                {lessonBullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Badge variant="primary">
                {t("whatInsidePage.blocks.checklistTitle")}
              </Badge>
              <h2 className="mt-3 text-xl font-bold">
                {t("whatInsidePage.blocks.checklistIntro")}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm font-mono">
                {checklist.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-bg)] px-3 py-2"
                  >
                    <Square className="h-4 w-4 text-[var(--color-muted)]" />
                    {c}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* AFTER */}
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("whatInsidePage.blocks.afterTitle")}
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {afterItems.map((it, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-[var(--color-success)] mt-0.5 shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-[var(--color-dark)] text-white">
        <Container className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("whatInsidePage.blocks.finalCtaTitle")}
          </h2>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link href="/pricing">
              <Button size="lg" variant="accent">
                {t("whatInsidePage.blocks.finalCtaPrimary")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/20 hover:bg-white/10"
              >
                {t("whatInsidePage.blocks.finalCtaSecondary")}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
