"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { CheckCircle2, XCircle, ListChecks, Gauge, Layers } from "lucide-react";

// Which lesson id shows which material (ids from course.ts: l1..l15).
const MATERIAL_BY_LESSON: Record<string, "checklist" | "noBid" | "costs" | "maxBid"> = {
  l6: "checklist",
  l7: "noBid",
  l8: "costs",
  l9: "maxBid",
};

type RawT = (k: string) => unknown;

export function LessonMaterial({ lessonId }: { lessonId: string }) {
  const t = useTranslations();
  const raw = t.raw as RawT;
  const kind = MATERIAL_BY_LESSON[lessonId];
  if (!kind) return null;

  if (kind === "checklist") {
    const m = raw("courseMaterials.checklist") as {
      title: string;
      intro: string;
      groups: { name: string; items: string[] }[];
    };
    return (
      <Material title={m.title} intro={m.intro} Icon={ListChecks}>
        <div className="grid gap-4 sm:grid-cols-2">
          {m.groups.map((g, i) => (
            <div key={i} className="rounded-xl border border-[var(--color-border)] p-4">
              <div className="text-sm font-semibold">{g.name}</div>
              <ul className="mt-2 space-y-1.5 text-sm">
                {g.items.map((it, j) => (
                  <li key={j} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Material>
    );
  }

  if (kind === "noBid") {
    const m = raw("courseMaterials.noBid") as {
      title: string;
      intro: string;
      items: string[];
    };
    return (
      <Material title={m.title} intro={m.intro} Icon={XCircle}>
        <ol className="grid gap-2 sm:grid-cols-2">
          {m.items.map((it, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-lg bg-red-50/60 p-3 text-sm"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-danger)] text-[11px] font-bold text-white">
                {i + 1}
              </span>
              {it}
            </li>
          ))}
        </ol>
      </Material>
    );
  }

  if (kind === "costs") {
    const m = raw("courseMaterials.costs") as { title: string; items: string[] };
    return (
      <Material title={m.title} Icon={Layers}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {m.items.map((it, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 rounded-lg bg-[var(--color-bg)] p-3 text-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">
                {i + 1}
              </span>
              {it}
            </li>
          ))}
        </ul>
      </Material>
    );
  }

  // maxBid
  const m = raw("courseMaterials.maxBid") as {
    title: string;
    intro: string;
    formula: string[];
    note: string;
  };
  return (
    <Material title={m.title} intro={m.intro} Icon={Gauge}>
      <ol className="space-y-1.5">
        {m.formula.map((line, i) => (
          <li
            key={i}
            className={
              i === m.formula.length - 1
                ? "mt-2 border-t border-[var(--color-border)] pt-2 font-bold"
                : "text-sm text-[var(--color-muted)]"
            }
          >
            {line}
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-lg bg-[var(--color-accent-soft)] p-3 text-sm text-[var(--color-text)]">
        {m.note}
      </p>
    </Material>
  );
}

function Material({
  title,
  intro,
  Icon,
  children,
}: {
  title: string;
  intro?: string;
  Icon: typeof ListChecks;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-baseline gap-2.5">
          <Icon className="h-5 w-5 shrink-0 text-[var(--color-primary)]" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {intro && (
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">{intro}</p>
        )}
        <div className="mt-4">{children}</div>
      </CardBody>
    </Card>
  );
}
