"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { calculate, DEFAULT_INPUT } from "@/lib/calculator";
import type { CalculatorInput } from "@/types";
import { fmt } from "@/lib/format";

const FIELDS: { key: keyof CalculatorInput; tKey: string }[] = [
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
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);
  const result = useMemo(() => calculate(input), [input]);
  const budget = 90000;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("calculator.title")}</h1>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardBody>
            <div className="grid gap-3 md:grid-cols-2">
              {FIELDS.map(({ key, tKey }) => (
                <div key={key}>
                  <Label htmlFor={key}>{t(`calculator.fields.${tKey}`)}</Label>
                  <Input
                    id={key}
                    type="number"
                    value={input[key]}
                    onChange={(e) =>
                      setInput({ ...input, [key]: Number(e.target.value) })
                    }
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card className="self-start">
          <CardBody className="space-y-4">
            <div>
              <div className="text-xs text-[var(--color-muted)]">
                {t("calculator.result.total")}
              </div>
              <div className="mt-1 text-3xl font-bold">
                {fmt(result.totalEstimated)} PLN
              </div>
            </div>
            <div>
              <div className="text-xs text-[var(--color-muted)]">
                {t("calculator.result.maxSafeBid")}
              </div>
              <div className="mt-1 text-xl font-semibold">
                ${fmt(result.maxSafeBidUsd)}
              </div>
            </div>
            {result.totalEstimated > budget && (
              <Badge variant="warning">
                {t("calculator.result.budgetExceeded")}
              </Badge>
            )}
            <p className="text-xs text-[var(--color-muted)]">
              {t("calculator.result.disclaimer")}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
