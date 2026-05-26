import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PackageCard } from "@/components/sections/PackageCard";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Database,
  ListChecks,
  FileCheck2,
  Calculator,
  ShieldAlert,
  FileText,
  LifeBuoy,
  ShieldCheck,
  AlertTriangle,
  Trophy,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("home.hero.title"),
    description: t("home.hero.subtitle"),
  };
}

const TOOL_ICONS = [
  GraduationCap,
  Database,
  ListChecks,
  FileCheck2,
  Calculator,
  ShieldAlert,
  FileText,
  LifeBuoy,
];

type RawT = (k: string) => unknown;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = t.raw as RawT;

  const chips = raw("home.hero.chips") as string[];
  const mockupCards = raw("home.hero.mockup.cards") as {
    label: string;
    value: string;
  }[];
  const mockupBadges = raw("home.hero.mockup.badges") as string[];

  const audienceItems = raw("home.audience.items") as {
    tag: string;
    title: string;
    desc: string;
  }[];
  const painItems = raw("home.pain.items") as string[];
  const toolsItems = raw("home.tools.items") as {
    title: string;
    desc: string;
  }[];
  const auctionsItems = raw("home.auctions.items") as string[];
  const titleItems = raw("home.titleGuide.items") as {
    name: string;
    desc: string;
  }[];
  const outcomesItems = raw("home.outcomes.items") as string[];
  const howSteps = raw("home.howItWorks.steps") as {
    title: string;
    desc: string;
  }[];
  const notIncluded = raw("home.notIncluded.items") as string[];
  const aboutStats = raw("home.about.stats") as {
    value: string;
    label: string;
  }[];
  const cases = raw("home.cases.items") as {
    tag: string;
    title: string;
    model: string;
    country: string;
    auction: string;
    lotPrice: string;
    estCosts: string;
    finalPrice: string;
    decision: string;
  }[];
  const previewItems = raw("home.preview.items") as {
    title: string;
    desc: string;
  }[];

  return (
    <>
      {/* HERO */}
      <Section className="bg-gradient-to-b from-white to-[var(--color-bg)]">
        <Container className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <Badge variant="primary" className="mb-4">
              {t("home.hero.kicker")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              {t("home.hero.title")}
            </h1>
            <p className="mt-5 text-lg text-[var(--color-muted)] max-w-2xl">
              {t("home.hero.subtitle")}
            </p>
            <p className="mt-3 text-sm text-[var(--color-muted)] max-w-2xl">
              {t("home.hero.lede")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/pricing">
                <Button size="lg">
                  {t("cta.choosePackage")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/course">
                <Button size="lg" variant="outline">
                  {t("cta.seeProgram")}
                </Button>
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
              {chips.map((c, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero mockup — student dashboard */}
          <Card className="bg-[var(--color-dark)] text-white border-none overflow-hidden">
            <CardBody className="space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--color-dark-muted)]">
                    {t("home.hero.mockup.title")}
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {t("home.hero.mockup.subtitle")}
                  </div>
                </div>
                <Badge variant="dark" className="bg-white/10 text-white">
                  live
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {mockupCards.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-white/5 p-3 border border-white/5"
                  >
                    <div className="text-[var(--color-dark-muted)] text-xs">
                      {c.label}
                    </div>
                    <div className="mt-1 font-semibold">{c.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {mockupBadges.map((b, i) => (
                  <Badge
                    key={i}
                    variant="dark"
                    className="bg-white/10 text-white border border-white/10"
                  >
                    ✓ {b}
                  </Badge>
                ))}
              </div>
              <div className="rounded-lg bg-white/5 p-3 border border-white/5">
                <div className="text-[var(--color-dark-muted)] text-xs">
                  {t("home.hero.mockup.title")}
                </div>
                <div className="mt-1 text-sm">
                  Margin OK · Title check passed · Submit bid request
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* AUDIENCE */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.audience.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("home.audience.subtitle")}
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {audienceItems.map((it, i) => (
              <Card key={i}>
                <CardBody>
                  <Badge variant="primary">{it.tag}</Badge>
                  <h3 className="mt-3 text-lg font-semibold">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--color-muted)]">
                    {it.desc}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* PAIN */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.pain.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("home.pain.subtitle")}
            </p>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {painItems.map((it, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 text-sm"
              >
                <AlertTriangle className="h-5 w-5 text-[var(--color-warning)] shrink-0 mt-0.5" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/course">
              <Button variant="outline">
                {t("cta.showRisks")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* TOOLS */}
      <Section id="tools">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.tools.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("home.tools.subtitle")}
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {toolsItems.map((it, i) => {
              const Icon = TOOL_ICONS[i] ?? GraduationCap;
              return (
                <Card key={i}>
                  <CardBody>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-primary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 font-semibold">{it.title}</h3>
                    <p className="mt-1.5 text-sm text-[var(--color-muted)]">
                      {it.desc}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* AUCTIONS */}
      <Section id="auctions" className="bg-[var(--color-dark)] text-white">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Badge
              variant="dark"
              className="bg-white/10 text-white border border-white/10 mb-4"
            >
              {t("home.auctions.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.auctions.title")}
            </h2>
            <p className="mt-3 text-[var(--color-dark-muted)] max-w-xl">
              {t("home.auctions.subtitle")}
            </p>
            <p className="mt-3 text-xs text-[var(--color-dark-muted)]">
              {t("home.auctions.note")}
            </p>
          </div>
          <div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {auctionsItems.map((a, i) => (
                <li
                  key={i}
                  className="rounded-lg bg-white/5 px-3 py-2 border border-white/5"
                >
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/car-auctions">
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white/20 hover:bg-white/10"
                >
                  {t("cta.moreAuctions")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* TITLE GUIDE */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.titleGuide.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("home.titleGuide.subtitle")}
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {titleItems.map((it, i) => (
              <Card key={i}>
                <CardBody>
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${
                        i === 0
                          ? "bg-[var(--color-success)]"
                          : i === 1
                            ? "bg-[var(--color-warning)]"
                            : i === 2
                              ? "bg-gray-400"
                              : "bg-[var(--color-danger)]"
                      }`}
                      aria-hidden
                    />
                    <h3 className="font-semibold">{it.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {it.desc}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/course">
              <Button variant="outline">
                {t("home.titleGuide.cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* OUTCOMES */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.outcomes.title")}
            </h2>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {outcomesItems.map((it, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white border border-[var(--color-border)] p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-[var(--color-success)] mt-0.5 shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.howItWorks.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("home.howItWorks.subtitle")}
            </p>
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {howSteps.map((step, i) => (
              <li
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-semibold">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-muted)]">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Link href="/how-it-works">
              <Button variant="outline">
                {t("cta.moreHowItWorks")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* PACKAGES */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("pricing.title")}
            </h2>
            <Link
              href="/pricing"
              className="text-sm font-medium text-[var(--color-primary)]"
            >
              {t("pricing.compare")} <ArrowRight className="inline h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <PackageCard id="basic" />
            <PackageCard id="pro" highlight />
            <PackageCard id="concierge" />
          </div>
          <Card className="mt-6 border-dashed">
            <CardBody className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Badge variant="dark">B2B</Badge>
                <h3 className="mt-2 text-xl font-bold">
                  {t("packages.partner.name")}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-muted)] max-w-xl">
                  {t("packages.partner.for")}
                </p>
              </div>
              <Link href="/partner">
                <Button variant="outline">
                  {t("cta.applyPartner")}
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* NOT INCLUDED */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.notIncluded.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("home.notIncluded.subtitle")}
            </p>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
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

      {/* ABOUT */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.about.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)] max-w-2xl">
              {t("home.about.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {aboutStats.map((s, i) => (
              <Card key={i}>
                <CardBody>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="mt-1 text-xs text-[var(--color-muted)]">
                    {s.label}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CASES */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.cases.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("home.cases.subtitle")}
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cases.map((c, i) => {
              const isAnti = i === cases.length - 1;
              return (
                <Card
                  key={i}
                  className={isAnti ? "border-red-200" : ""}
                >
                  <CardBody>
                    <div className="flex items-baseline justify-between gap-3">
                      <Badge variant={isAnti ? "danger" : "primary"}>
                        {c.tag}
                      </Badge>
                      {isAnti ? (
                        <ShieldAlert className="h-5 w-5 text-[var(--color-danger)]" />
                      ) : (
                        <Trophy className="h-5 w-5 text-[var(--color-success)]" />
                      )}
                    </div>
                    <h3 className="mt-3 font-semibold">{c.title}</h3>
                    <div className="mt-2 text-sm font-medium">{c.model}</div>
                    <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <dt className="text-[var(--color-muted)]">country</dt>
                        <dd>{c.country}</dd>
                      </div>
                      <div>
                        <dt className="text-[var(--color-muted)]">auction</dt>
                        <dd>{c.auction}</dd>
                      </div>
                      <div>
                        <dt className="text-[var(--color-muted)]">lot</dt>
                        <dd>{c.lotPrice}</dd>
                      </div>
                      <div>
                        <dt className="text-[var(--color-muted)]">costs</dt>
                        <dd>{c.estCosts}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-[var(--color-muted)]">final</dt>
                        <dd className="font-medium">{c.finalPrice}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-sm text-[var(--color-muted)]">
                      {c.decision}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* PREVIEW */}
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.preview.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("home.preview.subtitle")}
            </p>
            <Card className="mt-6">
              <CardBody>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white/70">
                  ▶ {t("home.preview.lessonTitle")}
                </div>
                <div className="mt-3 text-sm text-[var(--color-muted)]">
                  {t("home.preview.lessonDuration")}
                </div>
              </CardBody>
            </Card>
            <div className="mt-6">
              <Link href="/pricing">
                <Button>
                  {t("home.preview.cta")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {previewItems.map((it, i) => (
              <Card key={i}>
                <CardBody>
                  <div className="flex items-baseline gap-3">
                    <FileText className="h-5 w-5 text-[var(--color-primary)] shrink-0" />
                    <div>
                      <h3 className="font-semibold">{it.title}</h3>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        {it.desc}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ TEASER */}
      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("faq.title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("home.audience.subtitle")}
            </p>
            <div className="mt-6">
              <Link href="/faq">
                <Button variant="outline">
                  {t("common.all")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <ul className="space-y-3">
            {(raw("faq.items") as { q: string; a: string }[])
              .slice(0, 4)
              .map((item, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4"
                >
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {item.a}
                  </p>
                </li>
              ))}
          </ul>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-[var(--color-dark)] text-white">
        <Container className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-center">
          <div>
            <ShieldCheck className="h-9 w-9 text-[var(--color-accent)] mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("home.finalCta.title")}
            </h2>
            <p className="mt-3 text-[var(--color-dark-muted)] max-w-xl">
              {t("home.finalCta.subtitle")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
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
