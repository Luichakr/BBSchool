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
  return { title: t("nav.register") };
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
        <h1 className="text-2xl font-bold">{t("nav.register")}</h1>
        <Card className="mt-6">
          <CardBody>
            <form className="space-y-3">
              <div>
                <Label htmlFor="r-name">{t("common.name")}</Label>
                <Input id="r-name" required />
              </div>
              <div>
                <Label htmlFor="r-email">{t("common.email")}</Label>
                <Input id="r-email" type="email" required />
              </div>
              <div>
                <Label htmlFor="r-pass">Password</Label>
                <Input id="r-pass" type="password" required minLength={8} />
              </div>
              <Link href="/checkout">
                <Button className="w-full" type="button">
                  {t("nav.register")}
                </Button>
              </Link>
              <p className="text-xs text-[var(--color-muted)]">
                {t("legal.disclaimer")}
              </p>
            </form>
          </CardBody>
        </Card>
      </Container>
    </Section>
  );
}
