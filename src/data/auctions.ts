// Real auction platforms BidBIDDERS managers work with, grouped by region.
// Names are brand names (locale-independent). Region labels + notes live in
// messages/{locale}.json under `auctionsAccess`.

export type AuctionRegionId = "usa" | "canada" | "eu" | "korea" | "special";

export type AuctionRegion = {
  id: AuctionRegionId;
  flag: string;
  /** optional info note key shown above the grid */
  note?: "phone" | "request";
  auctions: string[];
};

export const AUCTION_REGIONS: AuctionRegion[] = [
  {
    id: "usa",
    flag: "🇺🇸",
    auctions: ["Copart", "IAAI", "Manheim", "EDGEpipeline", "ACVauctions", "Adesa"],
  },
  {
    id: "canada",
    flag: "🇨🇦",
    auctions: ["Copart.ca", "Impact", "Stark Auto Sales", "Progipix"],
  },
  {
    id: "eu",
    flag: "🇪🇺",
    auctions: [
      "Auto One",
      "BCA",
      "OPENLANE",
      "Copart.de",
      "Ald Carmarket",
      "Auksjonen",
      "kvdcars",
      "Copart.fi",
      "Exleasingcar",
      "Autobid.de",
      "Womauktion",
      "Klaravik",
      "Troostwijk Auctions",
      "Alcopa auction",
      "Copart.uk",
      "Caronsale",
    ],
  },
  {
    id: "korea",
    flag: "🇰🇷",
    note: "phone",
    auctions: ["Happy Car Service", "Glovis", "Duocar"],
  },
  {
    id: "special",
    flag: "🚜",
    note: "request",
    auctions: [],
  },
];

export const TOTAL_AUCTIONS = AUCTION_REGIONS.reduce(
  (sum, r) => sum + r.auctions.length,
  0,
);

// Curated, diverse set of recognizable platforms for the home-page hub teaser.
export const HUB_AUCTIONS: string[] = [
  "Copart",
  "IAAI",
  "Manheim",
  "Adesa",
  "ACVauctions",
  "BCA",
  "OPENLANE",
  "Auto One",
  "Klaravik",
  "Caronsale",
  "Autobid.de",
  "Glovis",
];

// Brand accent colors for recognizable platforms; fallback handled in the UI.
export const AUCTION_BRAND_COLORS: Record<string, string> = {
  Copart: "#2f6bff",
  "Copart.ca": "#2f6bff",
  "Copart.de": "#2f6bff",
  "Copart.fi": "#2f6bff",
  "Copart.uk": "#2f6bff",
  IAAI: "#e23744",
  Manheim: "#e0a008",
  Adesa: "#1f7ae0",
  ACVauctions: "#ff5c00",
  EDGEpipeline: "#4ea3ff",
  BCA: "#e23744",
  OPENLANE: "#2f6bff",
  Impact: "#3fb6c4",
  Progipix: "#3fa9f5",
  "Stark Auto Sales": "#e0a008",
  kvdcars: "#f5c518",
  "Auto One": "#2f6bff",
  Klaravik: "#3ddc84",
  Caronsale: "#e0a008",
  Glovis: "#2f6bff",
  Duocar: "#e23744",
};
