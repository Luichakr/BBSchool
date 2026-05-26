import type { CourseModule } from "@/types";

function lessons(moduleId: string, count: number, requiredCount: number) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${moduleId}-l${i + 1}`,
    moduleId,
    index: i,
    durationMinutes: 8 + i,
    requiredBeforeBidRequest: i < requiredCount,
  }));
}

export const COURSE: CourseModule[] = [
  { id: "m1", index: 0, lessons: lessons("m1", 3, 3) },
  { id: "m2", index: 1, lessons: lessons("m2", 3, 2) },
  { id: "m3", index: 2, lessons: lessons("m3", 3, 3) },
  { id: "m4", index: 3, lessons: lessons("m4", 3, 3) },
  { id: "m5", index: 4, lessons: lessons("m5", 3, 3) },
  { id: "m6", index: 5, lessons: lessons("m6", 3, 2) },
  { id: "m7", index: 6, lessons: lessons("m7", 5, 0) },
];

export const COURSE_STATS = {
  lessons: COURSE.reduce((s, m) => s + m.lessons.length, 0),
  modules: COURSE.length,
  hours: 3,
  checklists: 6,
};
