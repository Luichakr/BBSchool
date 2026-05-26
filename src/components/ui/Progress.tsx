import { cn } from "@/lib/cn";

export function Progress({
  value,
  max = 100,
  className,
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-valuemin={0}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-gray-100",
        className,
      )}
    >
      <div
        className="h-full bg-[var(--color-primary)] transition-[width]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
