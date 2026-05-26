"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { COURSE } from "@/data/course";
import { useDashboard } from "@/store/dashboard";

export default function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = use(params);
  const t = useTranslations();
  const { completedLessonIds, markLessonComplete } = useDashboard();

  const moduleEntry = COURSE.find((m) => m.lessons.some((l) => l.id === lessonId));
  const lesson = moduleEntry?.lessons.find((l) => l.id === lessonId);
  if (!moduleEntry || !lesson) {
    return (
      <Card>
        <CardBody>Lesson not found.</CardBody>
      </Card>
    );
  }
  const modulesT = (t.raw as (k: string) => unknown)("course.modules") as {
    title: string;
    lessons: string[];
  }[];
  const modCopy = modulesT[moduleEntry.index];
  const title = modCopy?.lessons?.[lesson.index] ?? lesson.id;
  const isCompleted = completedLessonIds.has(lessonId);

  return (
    <div className="space-y-6">
      <Link href="/dashboard/course" className="text-sm text-[var(--color-primary)]">
        ← {t("common.back")}
      </Link>
      <Card>
        <CardBody>
          <Badge className="mb-2">{modCopy?.title}</Badge>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="mt-4 aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white/60">
            Video placeholder · {lesson.durationMinutes} min
          </div>
          <div className="mt-6 space-y-3 text-[var(--color-muted)]">
            <p>{t("home.hero.subtitle")}</p>
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
    </div>
  );
}
