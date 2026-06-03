import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { PageHeader } from "@/components/sections/PageHeader";
import { COURSE_STATS, COURSE_LESSONS } from "@/data/course";
import {
  CheckCircle2,
  Clock,
  PlayCircle,
  ListChecks,
  ArrowRight,
  FileCheck2,
  Calculator,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("course.title"),
    description: t("course.subtitle"),
    other: {
      "application-ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        name: t("course.title"),
        description: t("course.subtitle"),
        provider: { "@type": "Organization", name: "BidBIDDERS Academy" },
      }),
    },
  };
}

type RawT = (k: string) => unknown;

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = t.raw as RawT;

  const lessons = raw("course.lessons") as {
    n: number;
    title: string;
    summary: string;
  }[];
  const introBullets = raw("course.freeIntro.bullets") as string[];
  const audience = raw("course.audience.items") as string[];
  const included = raw("course.included.items") as string[];
  const processItems = raw("course.process.items") as string[];
  const requirements = raw("course.requirements.items") as string[];
  const courseFaq = raw("course.faq") as { q: string; a: string }[];

  return (
    <>
      <PageHeader
        kicker={t("nav.course")}
        title={t("course.title")}
        subtitle={t("course.subtitle")}
      />

      {/* FREE INTRO LESSON — lead-magnet block */}
      <Section className="!pt-0">
        <Container>
          <Card className="border-[var(--color-primary)] shadow-md">
            <CardBody className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <Badge variant="primary">{t("course.freeIntro.kicker")}</Badge>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold">
                  {t("course.freeIntro.title")}
                </h2>
                <p className="mt-3 text-[var(--color-muted)]">
                  {t("course.freeIntro.subtitle")}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                  <Clock className="h-3.5 w-3.5" />
                  {t("course.freeIntro.duration")}
                </div>
                <ul className="mt-5 space-y-2 text-sm">
                  {introBullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href="/contact?type=course">
                    <Button size="lg">
                      <PlayCircle className="h-5 w-5" />
                      {t("course.freeIntro.cta")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-deep)] text-white/80 flex items-center justify-center text-base">
                <PlayCircle className="h-12 w-12" />
              </div>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* STATS */}
      <Section className="!pt-0">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                v: COURSE_STATS.lessons,
                l: t("course.stats.lessons"),
                Icon: ListChecks,
              },
              {
                v: `${COURSE_STATS.hours}+`,
                l: t("course.stats.hours"),
                Icon: Clock,
              },
              {
                v: COURSE_STATS.freeIntro,
                l: t("course.stats.modules"),
                Icon: PlayCircle,
              },
              {
                v: `${COURSE_STATS.checklists}+`,
                l: t("course.stats.checklists"),
                Icon: FileCheck2,
              },
            ].map((s, i) => (
              <Card key={i}>
                <CardBody>
                  <s.Icon className="h-5 w-5 text-[var(--color-primary)]" />
                  <div className="mt-3 text-2xl font-bold">{s.v}</div>
                  <div className="text-xs text-[var(--color-muted)]">{s.l}</div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* AUDIENCE + INCLUDED */}
      <Section className="!pt-0">
        <Container className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("course.audience.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {audience.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("course.included.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {included.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* 15 LESSONS PROGRAM */}
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("nav.whatInside")}
          </h2>
          <ol className="mt-8 space-y-3">
            {lessons.map((lesson, i) => {
              // Find matching meta from COURSE_LESSONS (skip free intro at index 0)
              const meta = COURSE_LESSONS[i + 1];
              const required = meta?.requiredBeforeBidRequest;
              return (
                <li key={lesson.n}>
                  <Card>
                    <CardBody>
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-baseline gap-3 flex-1">
                          <span className="text-xl font-bold text-[var(--color-primary)] w-8 shrink-0">
                            {String(lesson.n).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="font-semibold">{lesson.title}</h3>
                            <p className="mt-1 text-sm text-[var(--color-muted)]">
                              {lesson.summary}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          {required && (
                            <Badge variant="warning">required</Badge>
                          )}
                          {meta && (
                            <span className="text-xs text-[var(--color-muted)]">
                              {meta.durationMinutes} мин
                            </span>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* PROCESS + REQUIREMENTS */}
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("course.process.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {processItems.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <Clock className="h-4 w-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("course.requirements.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {requirements.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <Calculator className="h-4 w-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* COURSE FAQ */}
      <Section className="bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">{t("faq.title")}</h2>
          <div className="mt-6">
            <Accordion items={courseFaq} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bb-dark">
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
          <p className="mt-6 text-xs text-[var(--color-dark-muted)]">
            <ArrowRight className="inline h-3 w-3" /> {t("legal.disclaimer")}
          </p>
        </Container>
      </Section>
    </>
  );
}
