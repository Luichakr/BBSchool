---
name: safe-refactor
description: Guards against destructive rewrites. Read before touching shared layout, i18n config, or types.
---

- Never bulk-delete files without re-running `npm run build` and `npm run typecheck`.
- Never change a route's locale segment shape without updating `routing.ts`, `middleware.ts`, all `Link` callsites, and sitemap/robots.
- Never rename a translation key in one locale without updating all four.
- Never replace `next-intl` navigation with raw `next/link` for locale-prefixed URLs.
