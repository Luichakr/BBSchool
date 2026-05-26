import { Check, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import type { PurchaseStepStatus } from "@/types";

export function Stepper({
  steps,
}: {
  steps: { title: string; date?: string; note?: string; status: PurchaseStepStatus }[];
}) {
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-4">
          <div className="relative flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                s.status === "completed" && "bg-[var(--color-success)] text-white",
                s.status === "current" && "bg-[var(--color-primary)] text-white",
                s.status === "pending" && "bg-gray-100 text-gray-500",
                s.status === "problem" && "bg-[var(--color-danger)] text-white",
              )}
            >
              {s.status === "completed" ? (
                <Check className="h-4 w-4" />
              ) : s.status === "problem" ? (
                <AlertTriangle className="h-4 w-4" />
              ) : s.status === "current" ? (
                <Clock className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="mt-1 h-full w-px flex-1 bg-[var(--color-border)]" />
            )}
          </div>
          <div className="flex-1 pb-2">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-medium">
                {i + 1}. {s.title}
              </span>
              {s.date && (
                <span className="text-xs text-[var(--color-muted)]">{s.date}</span>
              )}
            </div>
            {s.note && (
              <p className="text-sm text-[var(--color-muted)]">{s.note}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
