import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("thankYou.partner.title"),
    robots: { index: false, follow: false },
  };
}

export default async function PartnerThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <Section>
      <Container className="max-w-lg">
        <Card>
          <CardBody className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--color-success)]" />
            <h1 className="mt-4 text-2xl font-bold">
              {t("thankYou.partner.title")}
            </h1>
            <p className="mt-3 text-[var(--color-muted)]">
              {t("thankYou.partner.body")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link href="/">
                <Button variant="outline">{t("thankYou.partner.back")}</Button>
              </Link>
              <Link href="/pricing">
                <Button>{t("thankYou.partner.pricing")}</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Section>
  );
}
