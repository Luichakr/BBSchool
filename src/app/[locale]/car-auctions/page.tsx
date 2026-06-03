import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { PageHeader } from "@/components/sections/PageHeader";
import { AuctionsByRegion } from "@/components/sections/AuctionsByRegion";
import { CONTACTS } from "@/data/contacts";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldAlert,
  Map,
  ArrowRight,
  Warehouse,
  Anchor,
  Smartphone,
  Eye,
  Globe2,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("carAuctionsDeep.title"),
    description: t("carAuctionsDeep.subtitle"),
  };
}

type RawT = (k: string) => unknown;

export default async function CarAuctionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = t.raw as RawT;

  const mapItems = raw("carAuctionsDeep.mapItems") as string[];
  const auctions = raw("carAuctionsDeep.auctions") as {
    name: string;
    summary: string;
    pros: string[];
    cons: string[];
  }[];
  const priceTrapItems = raw("carAuctionsDeep.priceTrap.items") as string[];
  const studentItems = raw(
    "carAuctionsDeep.whatStudentGets.items",
  ) as string[];
  const whenAccessItems = raw("carAuctionsDeep.whenAccess.items") as string[];
  const caFaq = raw("carAuctionsDeep.faq") as { q: string; a: string }[];

  const clientSees = raw("carAuctionsExtras.clientSeesItems") as string[];
  const warehouseItems = raw(
    "carAuctionsExtras.warehousesItems",
  ) as string[];
  const directory = raw("carAuctionsExtras.directory") as {
    region: string;
    items: string[];
  }[];
  const appItems = raw("carAuctionsExtras.appItems") as string[];

  return (
    <>
      <PageHeader
        kicker={t("nav.auctions")}
        title={t("carAuctionsDeep.title")}
        subtitle={t("carAuctionsExtras.subtitleEnhanced")}
      />

      {/* CLIENT SEES */}
      <Section className="!pt-0">
        <Container>
          <Card>
            <CardBody>
              <div className="flex items-baseline gap-3">
                <Eye className="h-6 w-6 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">
                  {t("carAuctionsExtras.clientSeesTitle")}
                </h2>
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                {clientSees.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-bg)] px-3 py-2.5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* AUCTIONS BY REGION */}
      <Section className="!pt-0">
        <Container>
          <div className="rounded-3xl bg-[var(--color-dark)] text-white p-6 md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              <Globe2 className="h-3.5 w-3.5" />
              {t("auctionsAccess.kicker")}
            </span>
            <h2 className="mt-5 text-2xl md:text-3xl font-bold">
              {t("auctionsAccess.title")}
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--color-dark-muted)] max-w-3xl">
              {t("auctionsAccess.subtitle")}
            </p>
            <div className="mt-8">
              <AuctionsByRegion
                labels={{
                  countLabel: t("auctionsAccess.countLabel"),
                  regions: raw("auctionsAccess.regions") as Record<
                    string,
                    string
                  >,
                  notes: raw("auctionsAccess.notes") as Record<string, string>,
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* MAP */}
      <Section className="!pt-0">
        <Container>
          <Card>
            <CardBody>
              <div className="flex items-baseline gap-3">
                <Map className="h-6 w-6 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">
                  {t("carAuctionsDeep.mapTitle")}
                </h2>
              </div>
              <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {mapItems.map((it, i) => (
                  <li
                    key={i}
                    className="flex min-h-[52px] items-center justify-center rounded-lg bg-[var(--color-bg)] px-3 py-2.5 text-center text-sm font-medium leading-tight"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* AUCTIONS LIST */}
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("carAuctionsDeep.auctionsTitle")}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {auctions.map((a) => (
              <Card key={a.name}>
                <CardBody>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-xl font-bold">{a.name}</h3>
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {a.summary}
                  </p>
                  <div className="mt-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-success)] mb-2">
                      +
                    </div>
                    <ul className="space-y-1.5 text-sm">
                      {a.pros.map((p, i) => (
                        <li key={i} className="flex gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-danger)] mb-2">
                      −
                    </div>
                    <ul className="space-y-1.5 text-sm">
                      {a.cons.map((c, i) => (
                        <li key={i} className="flex gap-2">
                          <XCircle className="h-4 w-4 text-[var(--color-danger)] mt-0.5 shrink-0" />
                          <span className="text-[var(--color-muted)]">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* WAREHOUSES + PORTS */}
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardBody>
              <div className="flex items-baseline gap-3">
                <Warehouse className="h-6 w-6 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">
                  {t("carAuctionsExtras.warehousesTitle")}
                </h2>
              </div>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                {t("carAuctionsExtras.warehousesLede")}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {warehouseItems.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <div className="text-xs text-[var(--color-muted)] mb-2">
                  US warehouse network:
                </div>
                <ul className="flex flex-wrap gap-2">
                  {CONTACTS.warehousesUS.map((w) => (
                    <li key={w}>
                      <Badge>{w}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-xs text-[var(--color-muted)]">
                {t("carAuctionsExtras.warehousesNote")}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex items-baseline gap-3">
                <Anchor className="h-6 w-6 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">
                  {t("carAuctionsExtras.portsTitle")}
                </h2>
              </div>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                {t("carAuctionsExtras.portsLede")}
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {CONTACTS.ports.europe.map((p) => (
                  <li
                    key={p}
                    className="rounded-lg bg-[var(--color-bg)] px-3 py-2.5 text-sm font-medium"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-5 inline-flex items-center gap-2 text-xs text-[var(--color-muted)]">
                <Globe2 className="h-3.5 w-3.5" />
                {t("carAuctionsExtras.experienceFact")}
              </p>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* DIRECTORY */}
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("carAuctionsExtras.directoryTitle")}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {directory.map((d) => (
              <Card key={d.region}>
                <CardBody>
                  <Badge variant="dark">{d.region}</Badge>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {d.items.map((x, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[var(--color-primary)] mt-0.5">
                          •
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-xs text-[var(--color-muted)]">
            {t("carAuctionsExtras.directoryNote")}
          </p>
        </Container>
      </Section>

      {/* APP / PLATFORM */}
      <Section>
        <Container>
          <Card>
            <CardBody>
              <div className="flex items-baseline gap-3">
                <Smartphone className="h-6 w-6 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">
                  {t("carAuctionsExtras.appTitle")}
                </h2>
              </div>
              <p className="mt-3 text-sm text-[var(--color-muted)] max-w-3xl">
                {t("carAuctionsExtras.appLede")}
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {appItems.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-bg)] px-3 py-2.5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* WHY FOR COURSE */}
      <Section className="bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("carAuctionsExtras.whyForCourseTitle")}
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            {t("carAuctionsExtras.whyForCourseBody")}
          </p>
        </Container>
      </Section>

      {/* PRICE TRAP */}
      <Section>
        <Container>
          <Card className="bg-red-50/40 border-red-100">
            <CardBody>
              <div className="flex items-baseline gap-3">
                <AlertTriangle className="h-6 w-6 text-[var(--color-danger)]" />
                <h2 className="text-2xl font-bold">
                  {t("carAuctionsDeep.priceTrap.title")}
                </h2>
              </div>
              <p className="mt-3 text-[var(--color-muted)]">
                {t("carAuctionsDeep.priceTrap.lede")}
              </p>
              <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                {priceTrapItems.map((it, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-white border border-red-100 px-3 py-2"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* WHAT STUDENT GETS */}
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("carAuctionsDeep.whatStudentGets.title")}
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {studentItems.map((it, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-xl bg-[var(--color-bg)] p-4 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link href="/course">
              <Button>
                {t("cta.seeProgram")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* DIRECT ACCESS */}
      <Section className="bg-[var(--color-dark)] text-white">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <ShieldAlert className="h-9 w-9 text-[var(--color-accent)]" />
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">
              {t("carAuctionsDeep.directAccess.title")}
            </h2>
            <p className="mt-4 text-[var(--color-dark-muted)] max-w-xl">
              {t("carAuctionsDeep.directAccess.body")}
            </p>
          </div>
          <Card className="bg-white/5 border border-white/10">
            <CardBody>
              <h3 className="font-semibold text-white">
                {t("carAuctionsDeep.whenAccess.title")}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-dark-muted)]">
                {whenAccessItems.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/partner">
                  <Button variant="accent" className="w-full">
                    {t("cta.applyPartner")}
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">{t("faq.title")}</h2>
          <div className="mt-6">
            <Accordion items={caFaq} />
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <Container className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("home.finalCta.title")}
          </h2>
          <p className="mt-3 text-[var(--color-muted)]">
            {t("home.finalCta.subtitle")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link href="/pricing">
              <Button size="lg">{t("home.finalCta.primary")}</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                {t("home.finalCta.secondary")}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
