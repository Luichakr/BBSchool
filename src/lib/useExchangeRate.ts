"use client";

import { useEffect, useState } from "react";
import { FALLBACK_EUR_USD_RATE } from "./import-calc";

export type Rates = {
  eurUsdRate: number; // USD→EUR (e.g. 0.8533)
  rateDate: string;
  loading: boolean;
};

// Fetches EUR/USD from NBP Poland (table A), same source as the main platform.
// Falls back to the static rate on any error.
export function useExchangeRate(): Rates {
  const [rates, setRates] = useState<Rates>({
    eurUsdRate: FALLBACK_EUR_USD_RATE,
    rateDate: "",
    loading: true,
  });

  useEffect(() => {
    let alive = true;
    fetch("https://api.nbp.pl/api/exchangerates/tables/A/?format=json")
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        const table = data?.[0];
        const list: { code: string; mid: number }[] = table?.rates ?? [];
        const usd = list.find((r) => r.code === "USD")?.mid;
        const eur = list.find((r) => r.code === "EUR")?.mid;
        if (usd && eur) {
          setRates({
            eurUsdRate: usd / eur,
            rateDate: table?.effectiveDate ?? "",
            loading: false,
          });
        } else {
          setRates((p) => ({ ...p, loading: false }));
        }
      })
      .catch(() => {
        if (alive) setRates((p) => ({ ...p, loading: false }));
      });
    return () => {
      alive = false;
    };
  }, []);

  return rates;
}
