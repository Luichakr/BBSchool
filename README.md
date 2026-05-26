# BidBIDDERS School

A guided learning platform for buying cars at US, Canadian, and European auctions.
Next.js 16 · App Router · TypeScript · Tailwind v4 · next-intl (pl/uk/ru/en).

## What's here

- Public marketing site: hero, audience, tools, 20+ auctions, title guide, outcomes, packages, cases, FAQ, final CTA
- Deep pages: `/course`, `/what-inside`, `/how-it-works`, `/car-auctions`, `/pricing`, `/about`, `/contact`, `/calculator`, `/risk`
- Packages: Basic / Pro / Concierge + Partner (B2B)
- Lead form with `libphonenumber-js` validation, UTM auto-collect, mock API at `/api/lead` (env-ready for Telegram / CRM / Sheets webhooks)
- Mock dashboard at `/dashboard/*` (course progress, cars, calculator, bid requests, 16-step purchase tracking)
- Manager mock at `/manager/*`
- 4 locales (default `/pl`, plus `/uk`, `/ru`, `/en`)
- Sitemap, robots, JSON-LD (Organization, WebSite, Course, FAQ)

## Quick start

```bash
npm install
npm run dev    # http://localhost:3000
```

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

Production build produces 200+ statically rendered pages across the 4 locales.

## Routes

Public — `/[locale]/{,basic,pro,concierge,partner,pricing,how-it-works,course,what-inside,calculator,car-auctions,auto-w-drodze,bidders-power,faq,about,risk,contact,login,register,checkout}`.

Dashboard — `/[locale]/dashboard/{,course,course/[id],package,cars,cars/new,cars/[id],calculator,bid-requests,bid-requests/new,purchase-tracking,auto-w-drodze,bidders-power,upgrade,profile,support}`.

Manager mock — `/[locale]/manager/{,bid-requests,bid-requests/[id],purchases,purchases/[id],auto-w-drodze,users}`.

Legal — `/[locale]/legal/{terms,privacy,cookies,risk-disclaimer,referral-rules,payment-terms,service-rules}`.

## Lead API integrations (env-ready)

The POST `/api/lead` handler validates against a Zod schema and forwards to optional integrations when env vars are present (no-op otherwise):

```
LEAD_TELEGRAM_BOT_TOKEN
LEAD_TELEGRAM_CHAT_ID
LEAD_CRM_WEBHOOK_URL
LEAD_GOOGLE_SHEETS_WEBHOOK_URL
```

## Deploy

This repo is set up for one-click deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLuichakr%2FBBSchool)

## License

Private project. All content © BidBIDDERS School.
