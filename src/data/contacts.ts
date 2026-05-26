// Centralized real contact info for BidBIDDERS School + operational Car Auctions Poland.
// Keep these in code, not in translations, so they don't drift between locales.

export const CONTACTS = {
  bidbidders: {
    email: "hello@bidbidders.com",
    telegram: "https://t.me/bidbidders",
    telegramLabel: "@bidbidders",
  },
  carAuctionsPoland: {
    name: "Car Auctions Poland",
    addressLine1: "Jawczyce, ul. Poznańska 56",
    addressLine2: "05-850, Polska",
    email: "Sales@carauctions.pl",
    phones: ["+48 784 890 644", "+48 571 660 242"],
  },
  ports: {
    europe: ["Rotterdam", "Bremerhaven", "Gdynia", "Kłajpeda"],
  },
  warehousesUS: [
    "Savannah",
    "Los Angeles",
    "Houston",
    "New Jersey",
    "Tacoma",
    "Norfolk",
    "New York",
  ],
} as const;
