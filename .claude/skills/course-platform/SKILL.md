---
name: course-platform
description: Owns the course catalog, lessons, progress and material gating. Use when editing course modules or unlocking logic.
---

- Course data lives in `src/data/course.ts`. Lesson copy is keyed by locale via `src/messages/*.json` (`course.modules[].lessons[]`).
- A lesson can be flagged `requiredBeforeBidRequest: true`. The bid-request form must check completion of all such lessons (mocked in Zustand) before allowing submission.
- The course shows 5 modules, ~15 lessons, 2–3h of video. Don't grow the curriculum without product sign-off — the short format is part of the value proposition.
- Materials (PDFs, calc templates) are attached per lesson via `Lesson.materials`. They're mock placeholders for now.
