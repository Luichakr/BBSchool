# BidBIDDERS — Claude Code project notes

BidBIDDERS.com is a public platform that combines a short paid course, a client dashboard, and a guided workflow for buying cars from US/Canadian auctions. The actual bidding is executed by BidBIDDERS managers through an internal professional tool called **Car Auctions**.

## Hard product rules

- **BidBIDDERS.com** is the public site (sales, course, dashboard, calculator, bid requests, post-purchase tracking, Auto-in-transit listings, BIDDERS Power, Partner application).
- **Car Auctions** is an internal tool used by managers/partners only. **Basic and Pro clients never get direct Car Auctions access.** They submit a bid request inside BidBIDDERS.com; a manager performs the bid in Car Auctions within the client's agreed limit.
- Partner-level access requires a contract, vetting and a deposit. Apply only via the Partner page.
- BIDDERS Power is a single-level referral program. 1 referral = 1 Power. 5 Power = service commission waived on one next car. Power is **not** cash, **not** sold separately, and **does not** cover the car price, fees, shipping, customs, taxes, repair or documents.
- Auto w drodze (Auto-in-transit) lists cars **already bought through BidBIDDERS** that are in delivery. Pro/Partner sellers may submit a car. Pro markup capped at 2000 USD over agreed base. Manager fee terms agreed individually.

## What we never claim

- "Buy a car without intermediaries"
- "Client bids directly on the auction"
- "Guaranteed profit / earnings"
- "Cars without risk"
- "Lowest price on the market"
- "Free car purchase"
- "BIDDERS Power covers the car price"
- "Partner access is open to anyone"

Correct phrasing: the client picks the car and budget; the manager executes the bid via Car Auctions; the course explains the process and risks; auction purchases always carry risk; BIDDERS Power discounts the service commission only.

## Stack

- Next.js 16 App Router · TypeScript · Tailwind v4 · next-intl
- Zod + React Hook Form for forms
- Zustand for client state
- Mock data only for now; the data layer is shaped for a future real backend.

## Languages

`/pl` (default, x-default), `/uk`, `/ru`, `/en`. Root `/` redirects via next-intl middleware. **Never hardcode user-facing copy** — go through `src/messages/*.json`.

## Routes

- Public: `/[locale]`, `/[locale]/{basic,pro,partner,pricing,how-it-works,course,auto-w-drodze,bidders-power,car-auctions,faq,about,contact,login,register,checkout,checkout/success}`
- Dashboard: `/[locale]/dashboard/...` (home, course, package, cars, calculator, bid-requests, purchase-tracking, auto-w-drodze, bidders-power, upgrade, profile, support)
- Manager mock: `/[locale]/manager/...`
- Legal: `/[locale]/legal/{terms,privacy,cookies,risk-disclaimer,referral-rules,payment-terms,service-rules}`

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

All three must pass before declaring work done.

## File layout

- `src/app/[locale]/...` — routes
- `src/components/ui/...` — primitives
- `src/components/layout/...` — Header, Footer, LanguageSwitcher, DashboardSidebar
- `src/components/sections/...` — page sections
- `src/lib/...` — helpers
- `src/data/...` — mock data and configs
- `src/types/...` — TS types
- `src/store/...` — Zustand stores
- `src/i18n/...` — next-intl config
- `src/messages/{pl,uk,ru,en}.json` — translations

## SEO

Every public page sets title/description via `generateMetadata`, plus `alternates.languages` for hreflang. Add JSON-LD for Organization, WebSite, Course, FAQPage, Product/Offer where relevant. Maintain `sitemap.xml` and `robots.txt`.
