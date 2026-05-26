"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  calculateExtended,
  DEFAULT_EXTENDED_INPUT,
  type ExtendedCalculatorInput,
  type VehicleType,
  type EuropeanPort,
} from "@/lib/calculator";
import type { CalculatorInput } from "@/types";
import { ArrowRight } from "lucide-react";

import { fmt } from "@/lib/format";

type Option = { value: string; label: string };

const NUMERIC_FIELDS: { key: keyof CalculatorInput; tKey: string }[] = [
  { key: "carPrice", tKey: "carPrice" },
  { key: "maxBid", tKey: "maxBid" },
  { key: "auctionFee", tKey: "auctionFee" },
  { key: "brokerFee", tKey: "brokerFee" },
  { key: "shippingUS", tKey: "shippingUS" },
  { key: "oceanShipping", tKey: "oceanShipping" },
  { key: "portFees", tKey: "portFees" },
  { key: "customs", tKey: "customs" },
  { key: "excise", tKey: "excise" },
  { key: "deliveryPl", tKey: "deliveryPl" },
  { key: "repair", tKey: "repair" },
  { key: "reserve", tKey: "reserve" },
];

export default function CalculatorPage() {
  const t = useTranslations();
  const vehicleTypes = t.raw("calculatorPage.vehicleTypes") as Option[];
  const ports = t.raw("calculatorPage.ports") as Option[];

  const [input, setInput] = useState<ExtendedCalculatorInput>(
    DEFAULT_EXTENDED_INPUT,
  );
  const result = useMemo(() => calculateExtended(input), [input]);

  const isEV = input.vehicleType === "ev" || input.vehicleType === "hybrid";

  return (
    <>
      <PageHeader
        kicker={t("calculatorPage.kicker")}
        title={t("calculatorPage.title")}
        subtitle={t("calculatorPage.subtitle")}
      />

      <Section className="!pt-0">
        <Container className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <Card>
            <CardBody>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="cp-type">
                    {t("calculatorPage.vehicleType")}
                  </Label>
                  <select
                    id="cp-type"
                    className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
                    value={input.vehicleType}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        vehicleType: e.target.value as VehicleType,
                      })
                    }
                  >
                    {vehicleTypes.map((v) => (
                      <option key={v.value} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="cp-port">{t("calculatorPage.port")}</Label>
                  <select
                    id="cp-port"
                    className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
                    value={input.port}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        port: e.target.value as EuropeanPort,
                      })
                    }
                  >
                    {ports.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                {NUMERIC_FIELDS.map(({ key, tKey }) => (
                  <div key={key}>
                    <Label htmlFor={`cp-${key}`}>
                      {t(`calculator.fields.${tKey}`)}
                    </Label>
                    <Input
                      id={`cp-${key}`}
                      type="number"
                      value={input[key]}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          [key]: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                ))}
                {isEV && (
                  <div className="md:col-span-2">
                    <Label htmlFor="cp-ev">
                      {t("calculatorPage.evSurcharge")}
                    </Label>
                    <Input
                      id="cp-ev"
                      type="number"
                      value={input.evSurchargeUsd}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          evSurchargeUsd: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          <div className="space-y-4 self-start">
            <Card>
              <CardBody>
                <h2 className="text-lg font-semibold">
                  {t("calculatorPage.resultTitle")}
                </h2>
                <div className="mt-4">
                  <div className="text-xs text-[var(--color-muted)]">
                    {t("calculator.result.total")}
                  </div>
                  <div className="mt-1 text-3xl font-bold">
                    {fmt(result.totalEstimated)} PLN
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-xs text-[var(--color-muted)]">
                    {t("calculator.result.maxSafeBid")}
                  </div>
                  <div className="mt-1 text-xl font-semibold">
                    ${fmt(result.maxSafeBidUsd)}
                  </div>
                </div>
                {isEV && (
                  <div className="mt-4">
                    <Badge variant="warning">
                      {t("calculatorPage.adjustedOcean")}: $
                      {fmt(result.adjustedOcean)}
                    </Badge>
                  </div>
                )}
                <p className="mt-5 text-xs text-[var(--color-muted)]">
                  {t("calculatorPage.disclaimer")}
                </p>
              </CardBody>
            </Card>

            <Card className="bg-blue-50/40 border-blue-100">
              <CardBody>
                <h3 className="font-semibold">
                  {t("calculatorPage.ctaTitle")}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  {t("calculatorPage.ctaBody")}
                </p>
                <Link
                  href="/contact?type=have-lot"
                  className="mt-4 inline-block"
                >
                  <Button>
                    {t("calculatorPage.ctaButton")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
