import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, Send, Calculator as CalcIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("thankYou.contact.title"),
    robots: { index: false, follow: false },
  };
}

export default async function ContactThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations();

  const variant = sp.type === "partner" ? "partner" : "contact";
  const k = `thankYou.${variant}` as const;
  const showSteps = variant === "contact";
  const steps = showSteps
    ? ((t.raw as (key: string) => unknown)("thankYou.contact.steps") as string[])
    : [];

  return (
    <Section>
      <Container className="max-w-2xl">
        <Card>
          <CardBody className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--color-success)]" />
            <h1 className="mt-4 text-2xl font-bold">{t(`${k}.title`)}</h1>
            <p className="mt-3 text-[var(--color-muted)]">{t(`${k}.body`)}</p>

            {showSteps && (
              <div className="mt-6 text-left rounded-xl bg-[var(--color-bg)] p-5">
                <h2 className="font-semibold">
                  {t("thankYou.contact.stepsTitle")}
                </h2>
                <ol className="mt-3 space-y-2 text-sm">
                  {steps.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold shrink-0">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link href="/">
                <Button variant="outline">{t(`${k}.back`)}</Button>
              </Link>
              <Link href="/pricing">
                <Button>{t(`${k}.pricing`)}</Button>
              </Link>
              {showSteps && (
                <>
                  <Link href="/calculator">
                    <Button variant="outline">
                      <CalcIcon className="h-4 w-4" />
                      {t("thankYou.contact.calculator")}
                    </Button>
                  </Link>
                  <a
                    href="https://t.me/bidbidders"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="accent">
                      <Send className="h-4 w-4" />
                      {t("thankYou.contact.telegram")}
                    </Button>
                  </a>
                </>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </Section>
  );
}
