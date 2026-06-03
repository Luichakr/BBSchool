"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { ImportCalculator } from "@/components/sections/ImportCalculator";
import { ArrowRight } from "lucide-react";

export default function CalculatorPage() {
  const t = useTranslations();

  return (
    <>
      <PageHeader
        kicker={t("calculatorPage.kicker")}
        title={t("calculatorPage.title")}
        subtitle={t("calculatorPage.subtitle")}
      />

      <Section className="!pt-0">
        <Container>
          <ImportCalculator />
          <p className="mt-6 max-w-3xl text-xs text-[var(--color-muted)]">
            {t("calculatorPage.disclaimer")}
          </p>

          <Card className="mt-6 bg-[var(--color-accent-soft)] border-[var(--color-accent-soft)]">
            <CardBody className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold">{t("calculatorPage.ctaTitle")}</h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {t("calculatorPage.ctaBody")}
                </p>
              </div>
              <Link href="/contact?type=have-lot" className="shrink-0">
                <Button>
                  {t("calculatorPage.ctaButton")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Container>
      </Section>
    </>
  );
}
