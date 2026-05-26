import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { PageHeader } from "@/components/sections/PageHeader";
import { COURSE, COURSE_STATS } from "@/data/course";
import {
  CheckCircle2,
  Clock,
  Layers,
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
        provider: { "@type": "Organization", name: "BidBIDDERS School" },
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

  const modules = raw("course.modules") as {
    title: string;
    lessons: string[];
  }[];
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
                v: COURSE_STATS.modules,
                l: t("course.stats.modules"),
                Icon: Layers,
              },
              {
                v: COURSE_STATS.checklists,
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

      {/* PROGRAM */}
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("nav.whatInside")}
          </h2>
          <div className="mt-8 space-y-4">
            {modules.map((mod, i) => {
              const lessonsCount = COURSE[i]?.lessons.length ?? mod.lessons.length;
              return (
                <Card key={i}>
                  <CardBody>
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-[var(--color-primary)]">
                          M{i + 1}
                        </span>
                        <h3 className="text-lg font-semibold">{mod.title}</h3>
                      </div>
                      <Badge>
                        {lessonsCount} {t("course.stats.lessons")}
                      </Badge>
                    </div>
                    <ol className="mt-4 grid gap-2 md:grid-cols-2">
                      {mod.lessons.map((les, j) => {
                        const required =
                          COURSE[i]?.lessons[j]?.requiredBeforeBidRequest ??
                          false;
                        return (
                          <li
                            key={j}
                            className="rounded-lg bg-[var(--color-bg)] p-3 text-sm flex justify-between gap-3"
                          >
                            <span>
                              {i + 1}.{j + 1} {les}
                            </span>
                            {required && (
                              <Badge variant="warning">required</Badge>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </CardBody>
                </Card>
              );
            })}
          </div>
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

      {/* WHAT INSIDE */}
      <Section>
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("courseDeep.whatInsideTitle")}
          </h2>
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
            {((t.raw as (k: string) => unknown)(
              "courseDeep.whatInsideItems",
            ) as string[]).map((it, i) => (
              <li
                key={i}
                className="rounded-lg bg-white border border-[var(--color-border)] px-3 py-2 text-center"
              >
                {it}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* LESSON EXAMPLE + CHECKLIST */}
      <Section className="bg-white">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("courseDeep.lessonExampleTitle")}
              </h2>
              <div className="mt-4 aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white/70">
                ▶ {t("courseDeep.lessonExample.name")}
              </div>
              <div className="mt-3 text-sm text-[var(--color-muted)]">
                {t("courseDeep.lessonExample.duration")}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {((t.raw as (k: string) => unknown)(
                  "courseDeep.lessonExample.inside",
                ) as string[]).map((it, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-gray-50 px-3 py-2 font-mono text-xs"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("courseDeep.checklistExampleTitle")}
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {((t.raw as (k: string) => unknown)(
                  "courseDeep.checklistExample",
                ) as string[]).map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-lg bg-[var(--color-bg)] p-3"
                  >
                    <span>{it}</span>
                    <Badge variant="success">✓</Badge>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* FINAL TASK */}
      <Section>
        <Container>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("courseDeep.finalTaskTitle")}
              </h2>
              <p className="mt-3 text-[var(--color-muted)]">
                {t("courseDeep.finalTaskBody")}
              </p>
              <ul className="mt-4 grid gap-2 md:grid-cols-3 text-sm">
                {((t.raw as (k: string) => unknown)(
                  "courseDeep.finalTaskItems",
                ) as string[]).map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-bg)] p-3"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold shrink-0">
                      {i + 1}
                    </span>
                    {it}
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
          <p className="mt-6 text-xs text-[var(--color-dark-muted)]">
            <ArrowRight className="inline h-3 w-3" /> {t("legal.disclaimer")}
          </p>
        </Container>
      </Section>
    </>
  );
}
