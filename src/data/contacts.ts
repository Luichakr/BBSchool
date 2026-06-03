// Centralized real contact info for BidBIDDERS School + operational Car Auctions Poland.
// Keep these in code, not in translations, so they don't drift between locales.

export const CONTACTS = {
  // Legal seller entity — used in Regulamin, Privacy and on the Contact page
  // (Przelewy24 verification). IMPORTANT: registeredAddress is the LEGAL/registry
  // office (Warszawa) — NOT where clients come. The physical yard people visit is
  // `carAuctionsPoland` (Jawczyce). Keep the two clearly separated in the UI.
  company: {
    legalName: "PRO TRADE GROUP Sp. z o.o.",
    legalNameFull: "PRO TRADE GROUP SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
    nip: "1133188836",
    regon: "543648670",
    krs: "0001215071",
    registeredAddress: "ul. Ostrobramska 101A/301, 04-041 Warszawa",
    email: "Sales@carauctions.pl",
    phone: "+48 784 890 644",
  },
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
