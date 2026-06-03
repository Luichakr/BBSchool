import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/sections/PageHeader";
import { LeadForm } from "@/components/forms/LeadForm";
import { CONTACTS } from "@/data/contacts";
import { Send, Mail, Phone, MapPin, ListChecks } from "lucide-react";

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
        <Container className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="space-y-4">
            <Card>
              <CardBody>
                <h2 className="text-lg font-semibold">
                  {t("contactPage.channels.title")}
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <div className="text-xs text-[var(--color-muted)]">
                      {t("contactPage.channels.telegramLabel")}
                    </div>
                    <a
                      href={CONTACTS.bidbidders.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-2 text-[var(--color-primary)] underline"
                    >
                      <Send className="h-4 w-4" />
                      {CONTACTS.bidbidders.telegramLabel}
                    </a>
                  </li>
                  <li>
                    <div className="text-xs text-[var(--color-muted)]">
                      {t("contactPage.channels.emailLabel")}
                    </div>
                    <a
                      href={`mailto:${CONTACTS.bidbidders.email}`}
                      className="mt-0.5 inline-flex items-center gap-2 text-[var(--color-primary)] underline"
                    >
                      <Mail className="h-4 w-4" />
                      {CONTACTS.bidbidders.email}
                    </a>
                  </li>
                  <li>
                    <div className="text-xs text-[var(--color-muted)]">
                      {t("contactPage.channels.carAuctionsEmailLabel")}
                    </div>
                    <a
                      href={`mailto:${CONTACTS.carAuctionsPoland.email}`}
                      className="mt-0.5 inline-flex items-center gap-2 underline"
                    >
                      <Mail className="h-4 w-4" />
                      {CONTACTS.carAuctionsPoland.email}
                    </a>
                  </li>
                  <li>
                    <div className="text-xs text-[var(--color-muted)]">
                      {t("contactPage.channels.phonesLabel")}
                    </div>
                    <ul className="mt-0.5 space-y-0.5">
                      {CONTACTS.carAuctionsPoland.phones.map((p) => (
                        <li key={p}>
                          <a
                            href={`tel:${p.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-2 underline"
                          >
                            <Phone className="h-4 w-4" />
                            {p}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs text-[var(--color-muted)]">
                      {t("contactPage.channels.officeLabel")}
                    </div>
                    <div className="mt-0.5 inline-flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 mt-0.5 text-[var(--color-muted)]" />
                      <div>
                        <Badge variant="dark" className="mb-1.5">
                          {CONTACTS.carAuctionsPoland.name}
                        </Badge>
                        <div>{CONTACTS.carAuctionsPoland.addressLine1}</div>
                        <div>{CONTACTS.carAuctionsPoland.addressLine2}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="font-semibold">{t("legalDocs.companyTitle")}</h2>
                <div className="mt-2 space-y-0.5 text-sm text-[var(--color-muted)]">
                  <div className="font-medium text-[var(--color-text)]">
                    {CONTACTS.company.legalNameFull}
                  </div>
                  <div>
                    {t("legalDocs.nipLabel")}: {CONTACTS.company.nip} ·{" "}
                    {t("legalDocs.regonLabel")}: {CONTACTS.company.regon}
                  </div>
                  <div>
                    {t("legalDocs.krsLabel")}: {CONTACTS.company.krs}
                  </div>
                  <div>
                    {t("legalDocs.registeredLabel")}:{" "}
                    {CONTACTS.company.registeredAddress}
                  </div>
                  <div className="mt-2 rounded-md bg-[var(--color-accent-soft)] px-3 py-2 text-xs text-[var(--color-text)]">
                    {t("legalDocs.visitNote")}
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-baseline gap-3">
                  <ListChecks className="h-5 w-5 text-[var(--color-primary)]" />
                  <h2 className="font-semibold">
                    {t("contactPage.tips.title")}
                  </h2>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-muted)]">
                  {tips.map((it, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--color-primary)] mt-1">
                        •
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
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
