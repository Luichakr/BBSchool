import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import {
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  Gem,
  Mail,
  PlayCircle,
  Zap,
} from "lucide-react";

type PkgId = "basic" | "pro" | "partner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("checkout.successPage.title") };
}

function parsePkg(sid?: string): PkgId {
  const head = (sid ?? "").split("_")[0] as PkgId;
  return head === "pro" || head === "partner" ? head : "basic";
}

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sid?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { sid } = await searchParams;
  const pkgId = parsePkg(sid);
  const t = await getTranslations();
  const pkgName = t(`packages.${pkgId}.name`);

  return (
    <Section className="bg-[var(--color-cream)]">
      <Container className="max-w-3xl">
        <Card className="overflow-hidden">
          <CardBody className="!p-8 md:!p-12">
            {/* Animated success badge */}
            <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[var(--color-success)]/10" />
              <span className="absolute inset-2 animate-ping rounded-full bg-[var(--color-success)]/20" />
              <span className="absolute inset-3 rounded-full bg-[var(--color-success)]/15" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--color-success)] bg-white text-[var(--color-success)]">
                <Check className="h-8 w-8" strokeWidth={3} />
              </span>
            </div>

            {/* Title + subtitle */}
            <h1 className="text-center text-3xl font-bold md:text-4xl">
              {t("checkout.successPage.title")}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-center text-[var(--color-muted)]">
              {t("checkout.successPage.subtitle")}
            </p>

            {/* Email confirmation */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--color-success)]">
              <Mail className="h-4 w-4" />
              <span>{t("checkout.successPage.emailSent")}</span>
            </div>

            {/* Package meta pill */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-3 md:gap-6 md:p-4">
              <MetaPill
                icon={<Gem className="h-4 w-4 text-[var(--color-primary)]" />}
                label={`${t("checkout.successPage.pkgLabel")}:`}
                value={pkgName}
                accent
              />
              <span className="hidden h-5 w-px bg-[var(--color-border)] md:block" />
              <MetaPill
                icon={<CalendarDays className="h-4 w-4" />}
                value={t("checkout.successPage.daysAccess")}
              />
              <span className="hidden h-5 w-px bg-[var(--color-border)] md:block" />
              <MetaPill
                icon={<BookOpen className="h-4 w-4" />}
                value={t("checkout.successPage.lessonsCount")}
              />
            </div>

            {/* Feature blocks */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Feature
                icon={<BookOpen className="h-5 w-5" />}
                title={t("checkout.successPage.feature1Title")}
                desc={t("checkout.successPage.feature1Desc")}
              />
              <Feature
                icon={<ClipboardCheck className="h-5 w-5" />}
                title={t("checkout.successPage.feature2Title")}
                desc={t("checkout.successPage.feature2Desc")}
              />
              <Feature
                icon={<Zap className="h-5 w-5" />}
                title={t("checkout.successPage.feature3Title")}
                desc={t("checkout.successPage.feature3Desc")}
              />
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={`https://client.bidbidders.com/${locale}/cabinet-demo`}
                className="w-full sm:w-auto"
              >
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  {t("checkout.successPage.goCabinet")}
                </Button>
              </a>
              <Link href="/course" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <PlayCircle className="mr-1.5 h-4 w-4" />
                  {t("checkout.successPage.firstLesson")}
                </Button>
              </Link>
            </div>

            {/* Spam hint */}
            <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
              ⓘ {t("checkout.successPage.spamHint")}
            </p>
          </CardBody>
        </Card>
      </Container>
    </Section>
  );
}

function MetaPill({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label?: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-md ${accent ? "bg-[var(--color-accent-soft)] text-[var(--color-primary)]" : "bg-white text-[var(--color-muted)]"}`}
      >
        {icon}
      </span>
      {label && <span className="text-[var(--color-text)]">{label}</span>}
      <span
        className={`font-semibold ${accent ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"}`}
      >
        {value}
      </span>
    </span>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-white p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-success)]/10 text-[var(--color-success)]">
        {icon}
      </span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-[var(--color-muted)]">{desc}</div>
      </div>
    </div>
  );
}
