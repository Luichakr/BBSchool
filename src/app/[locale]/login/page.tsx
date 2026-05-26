import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("nav.login") };
}

export default async function LoginPage({
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
        <h1 className="text-2xl font-bold">{t("nav.login")}</h1>
        <Card className="mt-6">
          <CardBody>
            <form className="space-y-3" action="/pl/dashboard">
              <div>
                <Label htmlFor="l-email">{t("common.email")}</Label>
                <Input id="l-email" type="email" required />
              </div>
              <div>
                <Label htmlFor="l-pass">Password</Label>
                <Input id="l-pass" type="password" required />
              </div>
              <Link href="/dashboard">
                <Button className="w-full" type="button">
                  {t("nav.login")}
                </Button>
              </Link>
              <div className="text-sm text-[var(--color-muted)] text-center">
                <Link href="/register" className="text-[var(--color-primary)]">
                  {t("nav.register")}
                </Link>
              </div>
            </form>
          </CardBody>
        </Card>
      </Container>
    </Section>
  );
}
