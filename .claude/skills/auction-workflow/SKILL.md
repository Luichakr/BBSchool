---
name: auction-workflow
description: Owns the add-car → calculator → bid request → manager review → post-purchase tracking → Auto-in-transit pipeline.
---

- Bid request form (`src/components/sections/BidRequestForm.tsx`) requires ALL risk checkboxes from `bidRequest.risk.items`. Submission disabled until all are checked.
- The 16-step post-purchase timeline statuses are in `src/data/purchase.ts` and labels come from `purchase.steps` in messages.
- Auto-in-transit submission (Pro+) enforces: car must have `purchaseId` and `status === 'in_shipping' | 'delivered'`; markup capped at 2000 USD; manager fee is a config value, not hardcoded copy.
- The bid request status flow is enforced in `src/lib/bid-request-status.ts`. Valid transitions only.
