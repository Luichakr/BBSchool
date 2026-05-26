import type { CalculatorInput, CalculatorResult } from "@/types";

// FX assumptions — keep visible to the user as "orientacyjne"
export const FX = {
  USD_TO_PLN: 4.05,
  EUR_TO_PLN: 4.3,
} as const;

// Extended calculator input for /calculator page.
// CalculatorInput from types is the "minimal/legacy" shape used by the
// dashboard widget. The page calculator extends it with port + vehicle type.

export type VehicleType =
  | "sedan"
  | "suv"
  | "truck"
  | "ev"
  | "hybrid"
  | "motorcycle";

export type EuropeanPort = "rotterdam" | "bremerhaven" | "gdynia" | "klaipeda";

export type ExtendedCalculatorInput = CalculatorInput & {
  vehicleType: VehicleType;
  port: EuropeanPort;
  evSurchargeUsd: number;
};

const PORT_FEE_OVERRIDE_EUR: Record<EuropeanPort, number> = {
  rotterdam: 300,
  bremerhaven: 320,
  gdynia: 280,
  klaipeda: 260,
};

const VEHICLE_OCEAN_MULTIPLIER: Record<VehicleType, number> = {
  sedan: 1,
  suv: 1.15,
  truck: 1.3,
  ev: 1.05,
  hybrid: 1.05,
  motorcycle: 0.5,
};

export function calculate(input: CalculatorInput): CalculatorResult {
  const totalUsd =
    input.carPrice +
    input.auctionFee +
    input.brokerFee +
    input.shippingUS +
    input.oceanShipping;
  const totalEur = input.portFees + input.customs;
  const totalPln = input.excise + input.deliveryPl + input.repair + input.reserve;
  const totalEstimated =
    totalUsd * FX.USD_TO_PLN + totalEur * FX.EUR_TO_PLN + totalPln;
  const fixedCostsUsd =
    input.auctionFee +
    input.brokerFee +
    input.shippingUS +
    input.oceanShipping +
    (input.portFees * FX.EUR_TO_PLN) / FX.USD_TO_PLN +
    (input.customs * FX.EUR_TO_PLN) / FX.USD_TO_PLN +
    (input.excise + input.deliveryPl + input.repair + input.reserve) /
      FX.USD_TO_PLN;
  const maxSafeBidUsd = Math.max(
    input.maxBid - fixedCostsUsd * 0.05,
    input.maxBid - 500,
  );
  return {
    totalUsd,
    totalEur,
    totalPln,
    totalEstimated: Math.round(totalEstimated),
    maxSafeBidUsd: Math.round(maxSafeBidUsd),
  };
}

export function calculateExtended(
  input: ExtendedCalculatorInput,
): CalculatorResult & { adjustedOcean: number } {
  const adjustedOcean = Math.round(
    input.oceanShipping * VEHICLE_OCEAN_MULTIPLIER[input.vehicleType] +
      (input.vehicleType === "ev" || input.vehicleType === "hybrid"
        ? input.evSurchargeUsd
        : 0),
  );
  const portFees = Math.max(input.portFees, PORT_FEE_OVERRIDE_EUR[input.port]);
  return {
    ...calculate({
      ...input,
      oceanShipping: adjustedOcean,
      portFees,
    }),
    adjustedOcean,
  };
}

export const DEFAULT_INPUT: CalculatorInput = {
  carPrice: 12000,
  maxBid: 13500,
  auctionFee: 850,
  brokerFee: 500,
  shippingUS: 450,
  oceanShipping: 1850,
  portFees: 300,
  customs: 1200,
  excise: 1500,
  deliveryPl: 1800,
  repair: 6000,
  reserve: 2000,
};

export const DEFAULT_EXTENDED_INPUT: ExtendedCalculatorInput = {
  ...DEFAULT_INPUT,
  vehicleType: "sedan",
  port: "gdynia",
  evSurchargeUsd: 0,
};
