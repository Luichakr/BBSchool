"use client";

import { useMemo } from "react";
import { AsYouType, type CountryCode } from "libphonenumber-js";
import { CountryCombo } from "./CountryCombo";

function formatPhone(raw: string, country: string): string {
  if (!raw) return "";
  try {
    return new AsYouType(country as CountryCode).input(raw);
  } catch {
    return raw;
  }
}

export function PhoneField({
  id,
  label,
  required,
  country,
  onCountryChange,
  value,
  onChange,
  locale,
  countryPlaceholder,
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
  country: string;
  onCountryChange: (c: string) => void;
  value: string;
  onChange: (v: string) => void;
  locale: string;
  countryPlaceholder: string;
  placeholder?: string;
}) {
  const display = useMemo(() => formatPhone(value, country), [value, country]);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-[var(--color-text)]"
      >
        {label}
        {required && <span className="text-[var(--color-primary)]"> *</span>}
      </label>
      <div className="flex gap-2">
        <div className="w-32 shrink-0">
          <CountryCombo
            value={country}
            onChange={onCountryChange}
            locale={locale}
            placeholder={countryPlaceholder}
            showDialCode
            compact
          />
        </div>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={display}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d ()+-]/g, "");
            onChange(formatPhone(raw, country));
          }}
          placeholder={placeholder ?? "123 456 789"}
          className="h-[42px] w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
        />
      </div>
    </div>
  );
}
