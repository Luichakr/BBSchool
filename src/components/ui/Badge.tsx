import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "neutral" | "primary" | "success" | "warning" | "danger" | "dark";

const styles: Record<Variant, string> = {
  neutral: "bg-gray-100 text-gray-700",
  primary: "bg-[var(--color-accent-soft)] text-[var(--color-primary)]",
  success: "bg-green-50 text-[var(--color-success)]",
  warning: "bg-amber-50 text-[var(--color-warning)]",
  danger: "bg-red-50 text-[var(--color-danger)]",
  dark: "bg-[var(--color-navy)] text-white",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
