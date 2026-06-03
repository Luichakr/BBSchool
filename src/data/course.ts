import type { Lesson } from "@/types";

// 15 paid lessons + 1 free intro — canonical scenario per BidBIDDERS course brief
// (see /Users/sergeybelskiy/Downloads/BidBIDDERS_scenariusze_15_lekcji_plus_wstep_UA.docx).
// Lessons translations live in messages/{locale}.json under `course.lessons[]`.

export type CourseLesson = Lesson & {
  free?: boolean;
};

// duration in minutes per lesson (from the scenario brief)
const DURATIONS = [9, 7, 8, 7, 8, 7, 10, 8, 11, 8, 9, 9, 8, 7, 8, 6];

function buildLessons(): CourseLesson[] {
  // index 0 = free intro, 1..15 = paid
  return DURATIONS.map((duration, i) => ({
    id: i === 0 ? "intro" : `l${i}`,
    moduleId: i === 0 ? "intro" : "main",
    index: i,
    durationMinutes: duration,
    free: i === 0,
    // Mandatory before bid request — knowledge that prevents costly mistakes
    requiredBeforeBidRequest: [4, 6, 7, 8, 9, 10].includes(i),
  }));
}

export const COURSE_LESSONS: CourseLesson[] = buildLessons();
export const FREE_INTRO = COURSE_LESSONS[0];
export const PAID_LESSONS = COURSE_LESSONS.slice(1);

export const COURSE_STATS = {
  lessons: PAID_LESSONS.length, // 15 paid
  freeIntro: 1,
  hours: 2, // ~2 hours of video total across 15 paid lessons
  checklists: 6,
  // Total minutes for the whole programme (used when needed)
  totalMinutes: DURATIONS.slice(1).reduce((s, m) => s + m, 0),
};

// Legacy exports for components that still group by module. We keep a thin
// adapter so the rest of the codebase compiles unchanged: everything appears
// as a single "main" module with all 15 paid lessons.
export const COURSE = [
  {
    id: "main",
    index: 0,
    lessons: PAID_LESSONS,
  },
];
