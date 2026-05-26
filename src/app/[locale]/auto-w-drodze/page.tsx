import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { MOCK_AUTO_W_DRODZE } from "@/data/mock";
import { Link } from "@/i18n/navigation";
import { fmt } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("autoWDrodze.title"),
    description: t("autoWDrodze.subtitle"),
  };
}

export default async function AutoWDrodzePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const rules = (t.raw as (k: string) => unknown)(
    "autoWDrodze.rules.items",
  ) as string[];

  return (
    <>
      <PageHeader title={t("autoWDrodze.title")} subtitle={t("autoWDrodze.subtitle")} />
      <Section className="!pt-0">
        <Container>
          <Card className="bg-amber-50 border-amber-200">
            <CardBody className="text-sm">{t("autoWDrodze.disclaimer")}</CardBody>
          </Card>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_AUTO_W_DRODZE.map((car) => (
              <Card key={car.id}>
                <div className="aspect-[16/10] rounded-t-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500">
                  {car.make} {car.model}
                </div>
                <CardBody>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <p className="text-xs text-[var(--color-muted)]">
                        VIN {car.vinMasked}
                      </p>
                    </div>
                    <Badge variant="primary">{car.shippingStatus}</Badge>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <dt className="text-[var(--color-muted)]">mileage</dt>
                      <dd>{fmt(car.mileage)} mi</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--color-muted)]">engine</dt>
                      <dd>{car.engine}</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--color-muted)]">damage</dt>
                      <dd>{car.damage}</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--color-muted)]">ETA</dt>
                      <dd>~{car.etaDays} d</dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex items-baseline justify-between">
                    <div className="text-2xl font-bold">
                      ${fmt(car.priceUsd)}
                    </div>
                    <Link href="/contact">
                      <Button size="sm">Request</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card className="mt-10">
            <CardBody>
              <h2 className="text-xl font-semibold">{t("autoWDrodze.rules.title")}</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                {rules.map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[var(--color-muted)]">
                {t("legal.disclaimer")}
              </p>
            </CardBody>
          </Card>
        </Container>
      </Section>
    </>
  );
}
