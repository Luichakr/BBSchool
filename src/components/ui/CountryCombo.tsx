"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { callingCode, countryName, sortedCountries } from "@/lib/countries";
import { Flag } from "./Flag";

export function CountryCombo({
  value,
  onChange,
  locale,
  placeholder,
  showDialCode,
  compact,
}: {
  value: string;
  onChange: (code: string) => void;
  locale: string;
  placeholder: string;
  showDialCode?: boolean;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const list = useMemo(() => {
    const all = sortedCountries(locale);
    if (!q.trim()) return all;
    const needle = q.toLowerCase();
    return all.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.code.toLowerCase().includes(needle) ||
        callingCode(c.code).includes(needle),
    );
  }, [locale, q]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-[42px] w-full items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] bg-white text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 ${compact ? "px-2" : "px-3"}`}
      >
        <span className="flex min-w-0 items-center gap-2 text-left">
          {value ? (
            <>
              <Flag code={value} />
              {!compact && (
                <span className="truncate">{countryName(value, locale)}</span>
              )}
              {showDialCode && (
                <span className="text-[var(--color-muted)]">
                  {callingCode(value)}
                </span>
              )}
            </>
          ) : (
            <span className="truncate text-[var(--color-muted)]">
              {placeholder}
            </span>
          )}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[var(--color-muted)]" />
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-72 max-w-[90vw] rounded-lg border border-[var(--color-border)] bg-white shadow-lg">
          <div className="border-b border-[var(--color-border)] p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="…"
                className="w-full rounded-md border border-[var(--color-border)] bg-white py-1.5 pl-7 pr-2 text-sm outline-none"
              />
            </div>
          </div>
          <ul className="max-h-72 overflow-auto py-1">
            {list.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                    setQ("");
                  }}
                  className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--color-accent-soft)] ${value === c.code ? "bg-[var(--color-accent-soft)] font-medium" : ""}`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Flag code={c.code} />
                    <span className="truncate">{c.name}</span>
                  </span>
                  <span className="text-xs text-[var(--color-muted)]">
                    {callingCode(c.code)}
                  </span>
                </button>
              </li>
            ))}
            {!list.length && (
              <li className="px-3 py-3 text-center text-xs text-[var(--color-muted)]">
                —
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
