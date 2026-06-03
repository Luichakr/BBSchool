"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import {
  calculateImportTotal,
  DEFAULT_IMPORT_INPUT,
  type ImportCalcInput,
  type AuctionType,
  type CarType,
  type EuPortId,
  type ImportTaxType,
} from "@/lib/import-calc";
import { useExchangeRate } from "@/lib/useExchangeRate";
import { fmt } from "@/lib/format";

type Opt = { value: string; label: string };

const eur = (n: number) => `${fmt(Math.round(n))} €`;
const usd = (n: number) => `$${fmt(Math.round(n))}`;

export function ImportCalculator() {
  const t = useTranslations("calculatorPage.calc");
  const auctions = t.raw("auctions") as Opt[];
  const carTypes = t.raw("carTypes") as Opt[];
  const taxTypes = t.raw("taxTypes") as Opt[];
  const ports = useTranslations("calculatorPage").raw("ports") as Opt[];

  const { eurUsdRate, rateDate } = useExchangeRate();
  const [input, setInput] = useState<Omit<ImportCalcInput, "eurUsdRate">>({
    lotPrice: DEFAULT_IMPORT_INPUT.lotPrice,
    auction: DEFAULT_IMPORT_INPUT.auction,
    carType: DEFAULT_IMPORT_INPUT.carType,
    euPortId: DEFAULT_IMPORT_INPUT.euPortId,
    importTaxType: DEFAULT_IMPORT_INPUT.importTaxType,
    usDelivery: DEFAULT_IMPORT_INPUT.usDelivery,
    oceanDelivery: DEFAULT_IMPORT_INPUT.oceanDelivery,
  });

  const r = useMemo(
    () => calculateImportTotal({ ...input, eurUsdRate }),
    [input, eurUsdRate],
  );

  const num = (v: string) => Math.max(0, Number(v.replace(/[^0-9.]/g, "")) || 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      {/* INPUTS */}
      <Card>
        <CardBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("lotPrice")}>
              <Input
                inputMode="numeric"
                value={String(input.lotPrice)}
                onChange={(e) => setInput((s) => ({ ...s, lotPrice: num(e.target.value) }))}
              />
            </Field>
            <Field label={t("auction")}>
              <Select
                value={input.auction}
                onChange={(v) => setInput((s) => ({ ...s, auction: v as AuctionType }))}
                options={auctions}
              />
            </Field>
            <Field label={t("carType")}>
              <Select
                value={input.carType}
                onChange={(v) => setInput((s) => ({ ...s, carType: v as CarType }))}
                options={carTypes}
              />
            </Field>
            <Field label={t("taxType")}>
              <Select
                value={input.importTaxType}
                onChange={(v) => setInput((s) => ({ ...s, importTaxType: v as ImportTaxType }))}
                options={taxTypes}
              />
            </Field>
            <Field label={t("usDelivery")}>
              <Input
                inputMode="numeric"
                value={String(input.usDelivery)}
                onChange={(e) => setInput((s) => ({ ...s, usDelivery: num(e.target.value) }))}
              />
            </Field>
            <Field label={t("oceanDelivery")}>
              <Input
                inputMode="numeric"
                value={String(input.oceanDelivery)}
                onChange={(e) => setInput((s) => ({ ...s, oceanDelivery: num(e.target.value) }))}
              />
            </Field>
            <Field label={t("port")}>
              <Select
                value={input.euPortId}
                onChange={(v) => setInput((s) => ({ ...s, euPortId: v as EuPortId }))}
                options={ports}
              />
            </Field>
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            {t("rate")}: 1&nbsp;EUR = {fmt(Math.round((1 / eurUsdRate) * 100) / 100)}&nbsp;USD
            {rateDate ? ` · ${t("rateOn")} ${rateDate}` : ""}
          </p>
        </CardBody>
      </Card>

      {/* RESULT */}
      <Card className="bg-[var(--color-dark)] text-white">
        <CardBody className="space-y-2">
          <Row label={t("result.auctionFee")} value={usd(r.auctionFee)} muted />
          <Row label={t("result.logisticsBase")} value={usd(r.logisticsBase)} muted />
          <div className="my-2 h-px bg-white/10" />
          <Row label={t("result.logisticsBaseEur")} value={eur(r.logisticsBaseEur)} muted />
          <Row
            label={`${t("result.importDuty")} · ${Math.round(r.importTaxRate * 100)}%`}
            value={eur(r.importDutyEur)}
            muted
          />
          <Row
            label={`${t("result.vat")} · ${Math.round(r.vatRate * 100)}%`}
            value={eur(r.vatAmountEur)}
            muted
          />
          <Row label={t("result.customsAgency")} value={eur(r.customsAgencyEur)} muted />
          <Row label={t("result.fee")} value={eur(r.bidBiddersFeeEur)} muted />
          <div className="my-3 h-px bg-white/15" />
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-semibold">{t("result.total")}</span>
            <span className="rounded-lg bg-[var(--color-primary)] px-3 py-1 text-base font-bold text-white">
              {eur(r.totalEur)}
            </span>
          </div>
          <p className="pt-2 text-xs text-[var(--color-dark-muted)]">{t("totalNote")}</p>
        </CardBody>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Opt[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className={muted ? "text-[var(--color-dark-muted)]" : ""}>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
