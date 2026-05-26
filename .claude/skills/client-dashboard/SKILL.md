---
name: client-dashboard
description: Owns the /dashboard area — package state, cars, calculations, bid requests, BIDDERS Power, upgrade flow.
---

- Dashboard layout lives in `src/app/[locale]/dashboard/layout.tsx` with a sidebar from `src/components/layout/DashboardSidebar.tsx`.
- All client state is mocked via Zustand stores in `src/store/`. Hydrate stores from `src/data/` mocks on first render.
- Show the user's package, days left, used/total bid requests, used/total successful purchases. Block disallowed actions in Basic (no Auto-in-transit submit, no Partner-only features).
- Upgrade flow is a soft pitch — always point to `/pricing` and `/partner` instead of inlining payment.
