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
  return { title: t("checkout.success") };
}

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <Section>
      <Container className="max-w-lg text-center">
        <Card>
          <CardBody>
            <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--color-success)]" />
            <h1 className="mt-4 text-2xl font-bold">{t("checkout.success")}</h1>
            <p className="mt-2 text-[var(--color-muted)]">
              {t("home.finalCta.subtitle")}
            </p>
            <Link href="/dashboard" className="mt-6 inline-block">
              <Button size="lg">{t("nav.dashboard")}</Button>
            </Link>
          </CardBody>
        </Card>
      </Container>
    </Section>
  );
}
