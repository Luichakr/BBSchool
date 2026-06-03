import type { AccessPackage } from "@/types";

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
