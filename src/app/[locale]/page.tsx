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
  PlayCircle,
  Headphones,
  Star,
  Globe2,
  Award,
  Ship,
  Users,
  BarChart3,
  Target,
} from "lucide-react";
import Image from "next/image";
import { AuctionsHub } from "@/components/sections/AuctionsHub";
import { HUB_AUCTIONS } from "@/data/auctions";

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
  const auctionsHighlights = raw("home.auctions.highlights") as string[];
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
    icon: string;
    value: string;
    label: string;
  }[];
  const aboutHighlights = raw("home.about.highlights") as {
    icon: string;
    title: string;
    desc: string;
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
      {/* HERO — dark full-bleed with car image */}
      <section className="relative overflow-hidden bb-dark">
        {/* Background image for tablet/desktop only; mobile gets image as block below */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <Image
            src="/hero-cars-v2.png"
            alt=""
            fill
            priority
            quality={92}
            sizes="(max-width: 1024px) 140vw, 100vw"
            className="object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f1a33_0%,#0f1a33_15%,rgba(15,26,51,0.85)_30%,transparent_65%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep,#0f1a33)]/40 to-transparent" />
        </div>

        <div className="relative">
          <Container className="relative z-10 pt-[3.1rem] pb-0 md:py-[4.33rem] lg:py-[4.96rem]">
            <div className="max-w-2xl">
              <div className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                {t("home.hero.kicker")}
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white">
                {t("home.hero.title")}
                {t("home.hero.titleAccent") && (
                  <>
                    {" "}
                    <span className="text-[var(--color-primary)]">
                      {t("home.hero.titleAccent")}
                    </span>
                  </>
                )}
              </h1>
              <p className="mt-5 text-base md:text-lg text-white/80 max-w-xl">
                {t("home.hero.subtitle")}
              </p>

              <div className="mt-8 flex flex-col md:flex-row md:flex-wrap gap-3">
                <Link href="/pricing" className="w-full md:w-auto">
                  <Button size="lg" variant="accent" className="w-full md:w-auto">
                    {t("cta.choosePackage")} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/course" className="w-full md:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full md:w-auto bg-transparent text-white border-white/25 hover:bg-white/10"
                  >
                    <PlayCircle className="h-5 w-5" />
                    {t("cta.seeProgram")}
                  </Button>
                </Link>
              </div>

              {/* Mini chips with circle-check icons */}
              <ul className="mt-10 grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-3 max-w-3xl">
                {chips.map((chip, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/85">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)] shrink-0" />
                    <span>{chip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>

          {/* Mobile-only image block (under text) with smooth navy → photo gradient */}
          <div className="md:hidden relative w-[140%] -ml-[40%] aspect-[16/7.7] overflow-hidden -mt-[100px]">
            <Image
              src="/hero-cars-v2.png"
              alt=""
              fill
              priority
              quality={92}
              sizes="140vw"
              className="object-cover object-[right_top]"
            />
            {/* Top gradient — navy dissolves into the photo */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-[var(--color-navy)] to-transparent" />
          </div>

          {/* Bottom dark stat strip — desktop/tablet only */}
          <Container className="hidden md:block pb-[2.13rem]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {[
                  { Icon: GraduationCap, ...mockupCards[0] },
                  { Icon: Star, ...mockupCards[1] },
                  { Icon: Globe2, ...mockupCards[2] },
                  { Icon: Headphones, ...mockupCards[3] },
                ].filter((c) => c.label).map((c, i) => (
                  <div key={i} className="flex items-baseline gap-3 px-2 md:px-5">
                    <c.Icon className="h-6 w-6 text-[var(--color-primary)] shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">{c.value}</div>
                      <div className="text-xs text-white/55 mt-0.5">{c.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </section>

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
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
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

      {/* AUCTIONS — hub & spoke */}
      <Section
        id="auctions"
        className="relative overflow-hidden bg-[var(--color-dark)] text-white"
      >
        {/* faint dotted glow backdrop on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-3/5 opacity-[0.08] bg-[radial-gradient(circle_at_60%_40%,#ff5c00_1px,transparent_2px)] bg-[length:26px_26px]"
        />
        <Container className="relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              <Globe2 className="h-3.5 w-3.5" />
              {t("home.auctions.badge")}
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight">
              {t("home.auctions.title")}
            </h2>
            <p className="mt-5 text-base text-[var(--color-dark-muted)] max-w-xl leading-relaxed">
              {t("home.auctions.subtitle")}
            </p>
            <div className="mt-5 flex items-start gap-3 max-w-xl">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
              <p className="text-sm text-[var(--color-dark-muted)] leading-relaxed">
                {t("home.auctions.note")}
              </p>
            </div>

            {/* highlights */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {[Trophy, Globe2, Target].map((Icon, i) => {
                const txt = auctionsHighlights[i];
                if (!txt) return null;
                return (
                  <div key={i} className="flex items-center gap-2.5 max-w-[180px]">
                    <Icon className="h-6 w-6 shrink-0 text-[var(--color-primary)]" strokeWidth={1.5} />
                    <span className="text-sm leading-tight text-white/85">
                      {txt}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-9">
              <Link href="/car-auctions">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white/25 hover:bg-white/10"
                >
                  {t("cta.moreAuctions")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT — hub diagram (real platforms) */}
          <AuctionsHub
            items={HUB_AUCTIONS}
            centerValue={t("home.auctions.centerValue")}
            centerLabel={t("home.auctions.centerLabel")}
          />
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
            <PackageCard id="partner" />
          </div>
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

      {/* ABOUT — Team behind the course */}
      <Section className="relative overflow-hidden bg-[#f6f7fb]">
        {/* Decorative faded map dots on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.06] bg-[radial-gradient(circle_at_30%_30%,#ff5c00_1px,transparent_2px)] bg-[length:22px_22px]"
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            {/* LEFT */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/25 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                <Users className="h-3.5 w-3.5" />
                {t("home.about.kicker")}
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                {t("home.about.title")}
              </h2>
              <p className="mt-6 text-base text-[var(--color-muted)] max-w-xl leading-relaxed">
                {t("home.about.subtitle")}
              </p>
              <div className="mt-7 border-l-2 border-[var(--color-primary)] pl-4 max-w-md">
                <p className="text-sm font-medium text-[var(--color-text)] leading-relaxed">
                  {t("home.about.quote")}
                </p>
              </div>
            </div>

            {/* RIGHT — 2x2 stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutStats.map((s, i) => {
                const IconMap: Record<string, typeof Award> = {
                  award: Award,
                  globe: Globe2,
                  ship: Ship,
                  users: Users,
                };
                const Icon = IconMap[s.icon] ?? Award;
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_-15px_rgba(15,26,51,0.18)] border border-black/[0.03] flex flex-col gap-3 min-h-[180px]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                      <Icon className="h-6 w-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                    </div>
                    <div className="mt-auto">
                      <div className="text-xl md:text-2xl font-bold leading-tight">
                        {s.value}
                      </div>
                      <div className="mt-1 text-sm text-[var(--color-muted)] leading-snug">
                        {s.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM HIGHLIGHTS STRIP */}
          <div className="mt-12 rounded-2xl bg-white p-5 md:p-7 shadow-[0_10px_30px_-15px_rgba(15,26,51,0.18)] border border-black/[0.03]">
            <div className="grid gap-6 md:grid-cols-3 md:divide-x md:divide-black/5">
              {aboutHighlights.map((h, i) => {
                const HMap: Record<string, typeof Award> = {
                  users: Users,
                  barchart: BarChart3,
                  shield: ShieldCheck,
                };
                const Icon = HMap[h.icon] ?? Users;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 md:px-5 first:md:pl-0 last:md:pr-0"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                      <Icon className="h-6 w-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-semibold leading-tight">{h.title}</div>
                      <div className="text-sm text-[var(--color-muted)] mt-0.5">
                        {h.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
      <Section className="bg-[#f6f7fb]">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          {/* Left column — title + video preview */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
              {t("home.preview.kicker")}
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              {t("home.preview.title")}
            </h2>
            <p className="mt-4 text-base text-[var(--color-muted)] max-w-lg">
              {t("home.preview.subtitle")}
            </p>

            {/* Video preview card — YouTube embed, muted autoplay from 1:05, no UI */}
            <div className="mt-8 relative aspect-video overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(15,26,51,0.45)] bg-black">
              {/* Iframe scaled up to crop YouTube top/bottom overlay zones */}
              <iframe
                src="https://www.youtube-nocookie.com/embed/KtrMj2tVP_g?autoplay=1&mute=1&start=65&loop=1&playlist=KtrMj2tVP_g&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0"
                title=""
                aria-hidden="true"
                tabIndex={-1}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[170%] h-[170%] pointer-events-none"
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
              />
              {/* Block all clicks/hovers so YouTube never shows its UI */}
              <div className="absolute inset-0" />
            </div>

            <div className="mt-6">
              <Link href="/pricing">
                <Button size="lg" variant="accent">
                  {t("home.preview.cta")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right column — 3 sample cards, vertically centered */}
          <div className="space-y-4 lg:self-center">
            {previewItems.map((it, i) => {
              const Icon = [FileCheck2, Calculator, ShieldAlert][i] ?? FileText;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white p-5 md:p-6 shadow-[0_8px_24px_-12px_rgba(15,26,51,0.18)] border border-black/[0.03] hover:shadow-[0_14px_30px_-12px_rgba(15,26,51,0.25)] transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                      <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base md:text-lg">
                        {it.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[var(--color-muted)] leading-relaxed">
                        {it.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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

    </>
  );
}
