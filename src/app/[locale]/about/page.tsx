import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/sections/PageHeader";
import { CONTACTS } from "@/data/contacts";
import {
  CheckCircle2,
  Building2,
  ShieldCheck,
  Mail,
  Phone,
  Send,
  MapPin,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("aboutPage.title"),
    description: t("aboutPage.subtitle"),
  };
}

type RawT = (k: string) => unknown;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = t.raw as RawT;
  const whyTeach = raw("aboutPage.whyTeach.items") as string[];
  const infra = raw("aboutPage.infrastructure.items") as string[];
  const trust = raw("aboutPage.trust.items") as { value: string; label: string }[];
  const position = raw("aboutPage.position.items") as string[];

  return (
    <>
      <PageHeader
        kicker={t("aboutPage.kicker")}
        title={t("aboutPage.title")}
        subtitle={t("aboutPage.subtitle")}
      />

      {/* WHY WE CAN TEACH */}
      <Section className="!pt-0">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("aboutPage.whyTeach.title")}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {t("aboutPage.subtitle")}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {whyTeach.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold">
                {t("aboutPage.infrastructure.title")}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {t("aboutPage.infrastructure.lede")}
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {infra.map((it, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-[var(--color-bg)] px-3 py-2"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* TRUST STATS */}
      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("aboutPage.trust.title")}
          </h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {trust.map((s, i) => (
              <Card key={i}>
                <CardBody>
                  <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                  <div className="mt-1 text-xs text-[var(--color-muted)]">
                    {s.label}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* OFFICE / CONTACTS */}
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardBody>
              <div className="flex items-baseline gap-3">
                <Building2 className="h-6 w-6 text-[var(--color-primary)]" />
                <h2 className="text-xl font-semibold">
                  {t("aboutPage.office.title")}
                </h2>
              </div>
              <div className="mt-4 space-y-1.5">
                <Badge variant="primary">
                  {t("aboutPage.office.bidbiddersLabel")}
                </Badge>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-[var(--color-primary)]" />
                  <a
                    href={CONTACTS.bidbidders.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] underline"
                  >
                    {CONTACTS.bidbidders.telegramLabel}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[var(--color-primary)]" />
                  <a
                    href={`mailto:${CONTACTS.bidbidders.email}`}
                    className="text-[var(--color-primary)] underline"
                  >
                    {CONTACTS.bidbidders.email}
                  </a>
                </li>
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Badge variant="dark">{CONTACTS.carAuctionsPoland.name}</Badge>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                {t("aboutPage.office.carAuctionsLabel")}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--color-muted)]" />
                  <span>
                    {CONTACTS.carAuctionsPoland.addressLine1},{" "}
                    {CONTACTS.carAuctionsPoland.addressLine2}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[var(--color-muted)]" />
                  <a
                    href={`mailto:${CONTACTS.carAuctionsPoland.email}`}
                    className="underline"
                  >
                    {CONTACTS.carAuctionsPoland.email}
                  </a>
                </li>
                {CONTACTS.carAuctionsPoland.phones.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[var(--color-muted)]" />
                    <a
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="underline"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      {/* POSITION */}
      <Section className="bg-[var(--color-dark)] text-white">
        <Container className="max-w-3xl">
          <div className="flex items-baseline gap-3">
            <ShieldCheck className="h-7 w-7 text-[var(--color-accent)]" />
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("aboutPage.position.title")}
            </h2>
          </div>
          <ul className="mt-6 space-y-3">
            {position.map((it, i) => (
              <li
                key={i}
                className="text-lg text-[var(--color-dark-muted)] before:content-['—_'] before:text-[var(--color-accent)]"
              >
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-[var(--color-dark-muted)]">
            {t("legal.disclaimer")}
          </p>
        </Container>
      </Section>
    </>
  );
}
