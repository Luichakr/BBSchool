// Centralized real contact info for BidBIDDERS School + operational Car Auctions Poland.
// Keep these in code, not in translations, so they don't drift between locales.

export const CONTACTS = {
  // Legal seller entity — required by Przelewy24 verification (regulamin,
  // privacy policy, contact page). Fill legalName + nip with the real values.
  // TODO(owner): wpisać pełną nazwę firmy i NIP (oraz REGON, jeśli jest).
  company: {
    legalName: "Car Auctions Poland", // [УТОЧНИТЬ: полное юр. название]
    nip: "", // [ВПИСАТЬ NIP] — обязательно для верификации Przelewy24
    regon: "", // опционально
    address: "Jawczyce, ul. Poznańska 56, 05-850, Polska",
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
