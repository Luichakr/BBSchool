import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/sections/PageHeader";
import { LeadForm } from "@/components/forms/LeadForm";
import { CONTACTS } from "@/data/contacts";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  ListChecks,
  Building2,
  Info,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("contactPage.title"),
    description: t("contactPage.subtitle"),
  };
}

type RawT = (k: string) => unknown;

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string; pkg?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = t.raw as RawT;
  const tips = raw("contactPage.tips.items") as string[];

  return (
    <>
      <PageHeader
        kicker={t("contactPage.kicker")}
        title={t("contactPage.title")}
        subtitle={t("contactPage.subtitle")}
      />
      <Section className="!pt-0">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
          <div className="flex flex-col">
            {/* Заголовок над карточкой — зеркально с «Оставьте заявку» справа */}
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {t("contactPage.channels.title")}
            </h2>
            {/* Единая карточка слева — секции внутри, чтобы зеркально с формой */}
            <Card className="flex-1">
              <CardBody className="divide-y divide-[var(--color-border)]">
                {/* Section 1: каналы связи */}
                <section className="pb-6">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {/* Telegram */}
                  <li>
                    <a
                      href={CONTACTS.bidbidders.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] p-3 hover:bg-[var(--color-bg)] transition"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
                        <Send className="h-4 w-4 text-[var(--color-primary)]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-[var(--color-muted)]">
                          {t("contactPage.channels.telegramLabel")}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {CONTACTS.bidbidders.telegramLabel}
                        </span>
                      </span>
                    </a>
                  </li>

                  {/* Email academy */}
                  <li>
                    <a
                      href={`mailto:${CONTACTS.bidbidders.email}`}
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] p-3 hover:bg-[var(--color-bg)] transition"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
                        <Mail className="h-4 w-4 text-[var(--color-primary)]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-[var(--color-muted)]">
                          {t("contactPage.channels.emailLabel")}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {CONTACTS.bidbidders.email}
                        </span>
                      </span>
                    </a>
                  </li>

                  {/* Sales email */}
                  <li>
                    <a
                      href={`mailto:${CONTACTS.carAuctionsPoland.email}`}
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] p-3 hover:bg-[var(--color-bg)] transition"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
                        <Mail className="h-4 w-4 text-[var(--color-primary)]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-[var(--color-muted)]">
                          {t("contactPage.channels.carAuctionsEmailLabel")}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {CONTACTS.carAuctionsPoland.email}
                        </span>
                      </span>
                    </a>
                  </li>

                  {/* Phones */}
                  <li>
                    <div className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] p-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
                        <Phone className="h-4 w-4 text-[var(--color-primary)]" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs text-[var(--color-muted)]">
                          {t("contactPage.channels.phonesLabel")}
                        </div>
                        <ul className="mt-0.5 space-y-0.5">
                          {CONTACTS.carAuctionsPoland.phones.map((p) => (
                            <li key={p}>
                              <a
                                href={`tel:${p.replace(/\s/g, "")}`}
                                className="block text-sm font-medium hover:text-[var(--color-primary)]"
                              >
                                {p}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>

                {/* Yard address — full width inside the card */}
                <div className="mt-3 flex items-start gap-3 rounded-xl border border-[var(--color-primary)]/25 bg-[var(--color-accent-soft)]/40 p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/15">
                    <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[var(--color-muted)]">
                        {t("contactPage.channels.officeLabel")}
                      </span>
                      <Badge variant="dark">
                        {CONTACTS.carAuctionsPoland.name}
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm font-medium">
                      {CONTACTS.carAuctionsPoland.addressLine1},{" "}
                      {CONTACTS.carAuctionsPoland.addressLine2}
                    </div>
                  </div>
                </div>
                </section>

                {/* Section 2: Реквизиты продавца */}
                <section className="py-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
                    <Building2 className="h-4 w-4 text-[var(--color-primary)]" />
                  </span>
                  <h2 className="font-semibold">
                    {t("legalDocs.companyTitle")}
                  </h2>
                </div>

                <div className="mt-4 text-sm font-medium leading-snug">
                  {CONTACTS.company.legalNameFull}
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt className="text-[var(--color-muted)]">
                    {t("legalDocs.nipLabel")}
                  </dt>
                  <dd className="font-medium">{CONTACTS.company.nip}</dd>
                  <dt className="text-[var(--color-muted)]">
                    {t("legalDocs.regonLabel")}
                  </dt>
                  <dd className="font-medium">{CONTACTS.company.regon}</dd>
                  <dt className="text-[var(--color-muted)]">
                    {t("legalDocs.krsLabel")}
                  </dt>
                  <dd className="font-medium">{CONTACTS.company.krs}</dd>
                  <dt className="text-[var(--color-muted)]">
                    {t("legalDocs.registeredLabel")}
                  </dt>
                  <dd className="font-medium">
                    {CONTACTS.company.registeredAddress}
                  </dd>
                </dl>

                <div className="mt-4 flex items-start gap-2 rounded-lg bg-[var(--color-accent-soft)] p-3 text-xs text-[var(--color-text)]">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" />
                  <span>{t("legalDocs.visitNote")}</span>
                </div>
                </section>

                {/* Section 3: Tips */}
                <section className="pt-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
                    <ListChecks className="h-4 w-4 text-[var(--color-primary)]" />
                  </span>
                  <h2 className="font-semibold">
                    {t("contactPage.tips.title")}
                  </h2>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-muted)]">
                  {tips.map((it, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 text-[var(--color-primary)]">•</span>
                      {it}
                    </li>
                  ))}
                </ul>
                </section>
              </CardBody>
            </Card>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {t("contactPage.formTitle")}
            </h2>
            <LeadForm
              defaults={{
                requestType: sp.type,
                packageInterest: sp.pkg,
              }}
              sourcePage="/contact"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
