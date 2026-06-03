"use client";

import { useTranslations } from "next-intl";
import { ImportCalculator } from "@/components/sections/ImportCalculator";

export default function CalculatorPage() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("calculator.title")}</h1>
      <ImportCalculator />
      <p className="max-w-3xl text-xs text-[var(--color-muted)]">
        {t("calculatorPage.disclaimer")}
      </p>
    </div>
  );
}
