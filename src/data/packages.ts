import type { AccessPackage } from "@/types";

// Polish VAT rate for digital services to consumers (B2C). 23% is the default.
// Education provided by accredited entities can be VAT-zw. (art. 43 ust. 1 ustawy
// o VAT) — if/when accreditation is in place, set VAT_RATE = 0 and the UI will
// switch automatically.
export const VAT_RATE = 0.23;

// `price.amount` is NET ("в руки продавцу"). The total billed to the customer is
// `amount * (1 + VAT_RATE)`. Use the helpers below — do not multiply manually.
export const PACKAGES: AccessPackage[] = [
  {
    id: "basic",
    price: { amount: 800, currency: "PLN" },
    durationDays: 90,
    includedSuccessfulPurchases: 1,
    bidRequestLimit: 5,
  },
  {
    id: "pro",
    highlight: true,
    price: { amount: 1700, currency: "PLN" },
    durationDays: 180,
    includedSuccessfulPurchases: 3,
    bidRequestLimit: 20,
  },
  {
    id: "partner",
    price: { amount: 2700, currency: "PLN" },
    durationDays: 365,
    bidRequestLimit: undefined,
  },
];

export const MAIN_PACKAGES: AccessPackage["id"][] = ["basic", "pro", "partner"];

export function getPackage(id: AccessPackage["id"]) {
  return PACKAGES.find((p) => p.id === id);
}

export type PriceBreakdown = {
  netto: number;
  vat: number;
  brutto: number;
  vatRate: number; // 0..1
  currency: string;
};

/** Compute net/VAT/gross from a package's stored net amount. */
export function priceBreakdown(id: AccessPackage["id"]): PriceBreakdown | null {
  const pkg = getPackage(id);
  if (!pkg?.price?.amount) return null;
  const netto = pkg.price.amount;
  const vat = Math.round(netto * VAT_RATE);
  return {
    netto,
    vat,
    brutto: netto + vat,
    vatRate: VAT_RATE,
    currency: pkg.price.currency,
  };
}
