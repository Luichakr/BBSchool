// Import cost engine — ported 1:1 from the BIDDERS_2 platform calculator
// (src/features/car-price-calculator/model/*) so numbers match the main site.
// The only difference: US trucking + ocean freight are user inputs here
// (the platform looks them up from a branch/port routes dataset we don't ship
// in the academy). All rates, fees and the formula are identical.

export type AuctionType = "Copart" | "IAAI" | "Manheim";
export type CarType =
  | "Automobiles"
  | "Crossover"
  | "SUVs"
  | "Moto"
  | "PickupTrucks";
export type EuPortId = "rotterdam" | "gdynia" | "bremerhaven" | "klaipeda";
export type ImportTaxType = "standard" | "electric" | "truck" | "motorcycle";

// ── Import duty rates ────────────────────────────────────────────────
const IMPORT_TAX_RATES: Record<ImportTaxType, number> = {
  standard: 0.1,
  electric: 0.0,
  truck: 0.22,
  motorcycle: 0.06,
};
export function getImportTaxRate(type: ImportTaxType): number {
  return IMPORT_TAX_RATES[type];
}

// ── EU ports (VAT + fixed customs agency fee) ────────────────────────
export interface EuPort {
  id: EuPortId;
  name: string;
  vatRate: number;
  customsAgencyEur: number;
}
export const EU_PORTS: Record<EuPortId, EuPort> = {
  rotterdam: { id: "rotterdam", name: "Rotterdam, NL", vatRate: 0.21, customsAgencyEur: 500 },
  gdynia: { id: "gdynia", name: "Gdynia, PL", vatRate: 0.23, customsAgencyEur: 500 },
  bremerhaven: { id: "bremerhaven", name: "Bremerhaven, DE", vatRate: 0.19, customsAgencyEur: 500 },
  klaipeda: { id: "klaipeda", name: "Klaipeda, LT", vatRate: 0.21, customsAgencyEur: 500 },
};

// ── Ocean multiplier (reference only — not applied, matches platform) ─
export const VEHICLE_MULTIPLIERS: Record<CarType, number> = {
  Automobiles: 800 / 900,
  Crossover: 900 / 900,
  SUVs: 950 / 900,
  Moto: 450 / 900,
  PickupTrucks: 1200 / 900,
};

// ── Auction fee tiers (verbatim from platform) ───────────────────────
type FeeRow = { maxAmount: number; fee: number };

const COPART_IAAI_FEES: FeeRow[] = [
  { maxAmount: 49, fee: 131 }, { maxAmount: 99, fee: 131 },
  { maxAmount: 199, fee: 205 }, { maxAmount: 299, fee: 240 },
  { maxAmount: 349, fee: 265 }, { maxAmount: 399, fee: 280 },
  { maxAmount: 449, fee: 305 }, { maxAmount: 499, fee: 315 },
  { maxAmount: 549, fee: 340 }, { maxAmount: 599, fee: 350 },
  { maxAmount: 699, fee: 365 }, { maxAmount: 799, fee: 390 },
  { maxAmount: 899, fee: 410 }, { maxAmount: 999, fee: 425 },
  { maxAmount: 1199, fee: 465 }, { maxAmount: 1299, fee: 485 },
  { maxAmount: 1399, fee: 500 }, { maxAmount: 1499, fee: 515 },
  { maxAmount: 1599, fee: 540 }, { maxAmount: 1699, fee: 555 },
  { maxAmount: 1799, fee: 575 }, { maxAmount: 1999, fee: 595 },
  { maxAmount: 2399, fee: 630 }, { maxAmount: 2499, fee: 665 },
  { maxAmount: 2999, fee: 700 }, { maxAmount: 3499, fee: 745 },
  { maxAmount: 3999, fee: 795 }, { maxAmount: 4499, fee: 855 },
  { maxAmount: 4999, fee: 880 }, { maxAmount: 5999, fee: 930 },
  { maxAmount: 6499, fee: 975 }, { maxAmount: 6999, fee: 995 },
  { maxAmount: 7499, fee: 1030 }, { maxAmount: 7999, fee: 1050 },
  { maxAmount: 8499, fee: 1090 }, { maxAmount: 8999, fee: 1110 },
  { maxAmount: 9999, fee: 1110 }, { maxAmount: 10499, fee: 1140 },
  { maxAmount: 10999, fee: 1140 }, { maxAmount: 11499, fee: 1140 },
  { maxAmount: 11999, fee: 1150 }, { maxAmount: 12499, fee: 1165 },
  { maxAmount: 14999, fee: 1180 },
];

const MANHEIM_FEES: FeeRow[] = [
  { maxAmount: 1000, fee: 225 }, { maxAmount: 3000, fee: 280 },
  { maxAmount: 5000, fee: 340 }, { maxAmount: 7000, fee: 390 },
  { maxAmount: 9000, fee: 425 }, { maxAmount: 11000, fee: 465 },
  { maxAmount: 13000, fee: 495 }, { maxAmount: 15000, fee: 525 },
  { maxAmount: 17000, fee: 555 }, { maxAmount: 19000, fee: 585 },
  { maxAmount: 21000, fee: 610 }, { maxAmount: 23000, fee: 630 },
  { maxAmount: 25000, fee: 655 }, { maxAmount: 27000, fee: 685 },
  { maxAmount: 30000, fee: 710 }, { maxAmount: 32500, fee: 735 },
  { maxAmount: 35000, fee: 760 }, { maxAmount: 37500, fee: 785 },
  { maxAmount: 40000, fee: 810 }, { maxAmount: 45000, fee: 835 },
  { maxAmount: 50000, fee: 885 }, { maxAmount: 60000, fee: 935 },
  { maxAmount: 70000, fee: 1035 }, { maxAmount: 80000, fee: 1135 },
  { maxAmount: 90000, fee: 1235 }, { maxAmount: 100000, fee: 1335 },
  { maxAmount: 110000, fee: 1435 }, { maxAmount: 999999999, fee: 1555 },
];

export function getAuctionFee(auction: AuctionType, lotPrice: number): number {
  const table = auction === "Manheim" ? MANHEIM_FEES : COPART_IAAI_FEES;
  const entry = table.find((r) => lotPrice <= r.maxAmount);
  if (!entry) {
    if (auction === "Copart" || auction === "IAAI")
      return Math.round(lotPrice * 0.06) + 290;
    return table[table.length - 1]?.fee ?? 0;
  }
  return entry.fee;
}

export const BIDBIDDERS_FEE_USD = 450;
export const FALLBACK_EUR_USD_RATE = 0.8533; // USD→EUR multiplier (NBP avg)

// ── Input / Output ───────────────────────────────────────────────────
export interface ImportCalcInput {
  lotPrice: number;
  auction: AuctionType;
  carType: CarType;
  euPortId: EuPortId;
  importTaxType: ImportTaxType;
  usDelivery: number; // trucking, USD
  oceanDelivery: number; // ocean freight, USD
  eurUsdRate: number; // USD→EUR (e.g. 0.8533)
}

export interface ImportCalcResult {
  lotPrice: number;
  auctionFee: number;
  usDelivery: number;
  oceanDelivery: number;
  logisticsBase: number; // USD
  logisticsBaseEur: number;
  importDutyEur: number;
  vatAmountEur: number;
  customsAgencyEur: number;
  bidBiddersFeeUsd: number;
  bidBiddersFeeEur: number;
  totalEur: number;
  importTaxRate: number;
  vatRate: number;
  vehicleMultiplier: number;
  eurUsdRate: number;
}

export function calculateImportTotal(input: ImportCalcInput): ImportCalcResult {
  const { lotPrice, auction, carType, euPortId, importTaxType, usDelivery, oceanDelivery, eurUsdRate } = input;

  const auctionFee = getAuctionFee(auction, lotPrice);
  const vehicleMultiplier = VEHICLE_MULTIPLIERS[carType];
  const logisticsBase = lotPrice + auctionFee + usDelivery + oceanDelivery;
  const logisticsBaseEur = logisticsBase * eurUsdRate;

  const importTaxRate = getImportTaxRate(importTaxType);
  const port = EU_PORTS[euPortId];
  const vatRate = port.vatRate;
  const customsAgencyEur = port.customsAgencyEur;

  const importDutyEur = logisticsBaseEur * importTaxRate;
  const vatAmountEur = (logisticsBaseEur + importDutyEur) * vatRate;

  const bidBiddersFeeUsd = BIDBIDDERS_FEE_USD;
  const bidBiddersFeeEur = bidBiddersFeeUsd * eurUsdRate;

  const totalEur =
    logisticsBaseEur + importDutyEur + vatAmountEur + customsAgencyEur + bidBiddersFeeEur;

  return {
    lotPrice, auctionFee, usDelivery, oceanDelivery, logisticsBase,
    logisticsBaseEur, importDutyEur, vatAmountEur, customsAgencyEur,
    bidBiddersFeeUsd, bidBiddersFeeEur, totalEur,
    importTaxRate, vatRate, vehicleMultiplier, eurUsdRate,
  };
}

export const DEFAULT_IMPORT_INPUT: ImportCalcInput = {
  lotPrice: 12000,
  auction: "Copart",
  carType: "Automobiles",
  euPortId: "gdynia",
  importTaxType: "standard",
  usDelivery: 450,
  oceanDelivery: 1100,
  eurUsdRate: FALLBACK_EUR_USD_RATE,
};
