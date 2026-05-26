import type { AccessPackage } from "@/types";

export const PACKAGES: AccessPackage[] = [
  {
    id: "basic",
    price: { amount: 2000, currency: "PLN" },
    durationDays: 90,
    includedSuccessfulPurchases: 1,
    bidRequestLimit: 5,
  },
  {
    id: "pro",
    highlight: true,
    price: { amount: 4500, currency: "PLN" },
    durationDays: 180,
    includedSuccessfulPurchases: 3,
    bidRequestLimit: 20,
  },
  {
    id: "concierge",
    price: { amount: 9500, currency: "PLN" },
    durationDays: 180,
    includedSuccessfulPurchases: 1,
    bidRequestLimit: undefined,
  },
  {
    id: "partner",
    durationDays: 365,
    bidRequestLimit: undefined,
  },
];

export const MAIN_PACKAGES: AccessPackage["id"][] = ["basic", "pro", "concierge"];
export const B2B_PACKAGES: AccessPackage["id"][] = ["partner"];

export function getPackage(id: AccessPackage["id"]) {
  return PACKAGES.find((p) => p.id === id);
}
