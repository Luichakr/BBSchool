---
name: project-architect
description: Owns the BidBIDDERS project structure, folder boundaries, and scalability. Use when adding new feature areas or moving files.
---

Keep the structure documented in `CLAUDE.md` ("File layout"). Don't introduce ad-hoc top-level folders.

- Domain entities live in `src/types/`. Mock data lives in `src/data/`. Stores live in `src/store/`.
- Reusable UI primitives go in `src/components/ui/`. Layout shells in `src/components/layout/`. Page-specific sections in `src/components/sections/`.
- Routes only orchestrate — heavy logic belongs in `src/lib/` or domain folders.
- Types must mirror the future backend shape (see `src/types/`), so adding a real API later is a swap, not a rewrite.
