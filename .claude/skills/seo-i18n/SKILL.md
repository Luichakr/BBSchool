---
name: seo-i18n
description: Owns metadata, hreflang, sitemap, robots, JSON-LD, and the four-language coverage.
---

- All 4 locales (pl, uk, ru, en) MUST have parallel keys in `src/messages/*.json`. CI should fail on missing keys (not yet wired — add a sanity script before launch).
- Every page exports `generateMetadata` with localized `title`, `description`, and `alternates.languages` for all 4 locales + `x-default → /pl`.
- `src/app/sitemap.ts` and `src/app/robots.ts` cover all locales × all public routes.
- JSON-LD: Organization + WebSite on every layout (via `Header`/footer JSON-LD component); Course on `/course`; FAQPage on `/faq`; Product/Offer on `/basic`, `/pro`; Service on `/partner`.
