"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { COURSE_LESSONS, PAID_LESSONS } from "@/data/course";
import { LessonMaterial } from "@/components/dashboard/LessonMaterial";
import { useDashboard } from "@/store/dashboard";

export default function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = use(params);
  const t = useTranslations();
  const { completedLessonIds, markLessonComplete } = useDashboard();

  const lesson = COURSE_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) {
    return (
      <Card>
        <CardBody>Lesson not found.</CardBody>
      </Card>
    );
  }

  const lessonsT = (t.raw as (k: string) => unknown)("course.lessons") as {
    n: number;
    title: string;
    summary: string;
  }[];
  const paidIndex = PAID_LESSONS.findIndex((l) => l.id === lessonId);
  const copy = paidIndex >= 0 ? lessonsT[paidIndex] : undefined;
  const title = copy?.title ?? lesson.id;
  const isCompleted = completedLessonIds.has(lessonId);

  return (
    <div className="space-y-6">
      <Link href="/dashboard/course" className="text-sm text-[var(--color-primary)]">
        ← {t("common.back")}
      </Link>
      <Card>
        <CardBody>
          {lesson.requiredBeforeBidRequest && (
            <Badge variant="warning" className="mb-2">required</Badge>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
          {copy?.summary && (
            <p className="mt-2 text-[var(--color-muted)]">{copy.summary}</p>
          )}
          <div className="mt-4 aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white/60">
            Video placeholder · {lesson.durationMinutes} min
          </div>
          <div className="mt-6 space-y-3 text-[var(--color-muted)]">
            <p>{t("course.subtitle")}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              disabled={isCompleted}
              onClick={() => markLessonComplete(lessonId)}
            >
              {isCompleted ? "✓ " + t("common.completed") : t("common.save")}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Lesson material (checklist / no-bid rules / costs / max bid) */}
      <LessonMaterial lessonId={lessonId} />
    </div>
  );
}
