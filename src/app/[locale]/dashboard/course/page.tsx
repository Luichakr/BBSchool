"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { COURSE } from "@/data/course";
import { useDashboard } from "@/store/dashboard";

export default function DashboardCoursePage() {
  const t = useTranslations();
  const { completedLessonIds } = useDashboard();
  const modules = (t.raw as (k: string) => unknown)("course.modules") as {
    title: string;
    lessons: string[];
  }[];
  const total = COURSE.reduce((s, m) => s + m.lessons.length, 0);
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

      <div className="space-y-4">
        {modules.map((mod, i) => (
          <Card key={i}>
            <CardBody>
              <h2 className="font-semibold">
                {i + 1}. {mod.title}
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {COURSE[i]?.lessons.map((l, j) => {
                  const isCompleted = completedLessonIds.has(l.id);
                  return (
                    <li key={l.id}>
                      <Link
                        href={`/dashboard/course/${l.id}` as `/dashboard/course/${string}`}
                        className="flex items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] p-3 hover:bg-gray-50"
                      >
                        <span>
                          {i + 1}.{j + 1} {mod.lessons[j]}
                        </span>
                        <div className="flex items-center gap-2">
                          {l.requiredBeforeBidRequest && (
                            <Badge variant="warning">required</Badge>
                          )}
                          <Badge variant={isCompleted ? "success" : "neutral"}>
                            {isCompleted ? "✓" : `${l.durationMinutes}m`}
                          </Badge>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
