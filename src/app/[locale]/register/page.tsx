import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { RegisterForm } from "@/components/auth/RegisterForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("auth.register.title"), robots: { index: false } };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <Section>
      <Container className="max-w-md">
        <h1 className="text-2xl font-bold">{t("auth.register.title")}</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          {t("auth.register.subtitle")}
        </p>
        <RegisterForm />
      </Container>
    </Section>
  );
}
