"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { PAID_LESSONS } from "@/data/course";
import { useDashboard } from "@/store/dashboard";

export default function DashboardCoursePage() {
  const t = useTranslations();
  const { completedLessonIds } = useDashboard();
  const lessons = (t.raw as (k: string) => unknown)("course.lessons") as {
    n: number;
    title: string;
    summary: string;
  }[];
  const total = PAID_LESSONS.length;
  const progress = Math.round((completedLessonIds.size / total) * 100);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("dashboard.nav.course")}</h1>
      <Card>
        <CardBody>
          <div className="flex items-baseline justify-between gap-3">
            <div className="font-semibold">
              {completedLessonIds.size}/{total} {t("course.stats.lessons")}
            </div>
            <Badge variant="primary">{progress}%</Badge>
          </div>
          <Progress value={progress} className="mt-3" />
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <ul className="space-y-2 text-sm">
            {lessons.map((lesson, i) => {
              const meta = PAID_LESSONS[i];
              if (!meta) return null;
              const isCompleted = completedLessonIds.has(meta.id);
              return (
                <li key={meta.id}>
                  <Link
                    href={
                      `/dashboard/course/${meta.id}` as `/dashboard/course/${string}`
                    }
                    className="flex items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] p-3 hover:bg-gray-50"
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="text-[var(--color-primary)] font-semibold w-6 shrink-0">
                        {String(lesson.n).padStart(2, "0")}
                      </span>
                      {lesson.title}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      {meta.requiredBeforeBidRequest && (
                        <Badge variant="warning">required</Badge>
                      )}
                      <Badge variant={isCompleted ? "success" : "neutral"}>
                        {isCompleted ? "✓" : `${meta.durationMinutes}m`}
                      </Badge>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
