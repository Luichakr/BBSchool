---
name: performance-a11y
description: Owns Lighthouse scores, mobile-first checks, accessibility (semantic HTML, focus, contrast, keyboard nav).
---

- Use `next/image` for all imagery. No raw `<img>` tags.
- Server components by default; mark `"use client"` only when needed.
- Forms: real `<label>`, `<button type="submit">`, visible focus rings, `aria-describedby` for errors.
- Dashboard sidebar collapses to a bottom nav on `< md` breakpoints.
- Targets: Lighthouse 90/95/95/95 (Perf/A11y/BP/SEO).
