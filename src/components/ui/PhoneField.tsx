"use client";

import { useMemo } from "react";
import {
  AsYouType,
  getExampleNumber,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js";
import phoneExamples from "libphonenumber-js/examples.mobile.json";
import { CountryCombo } from "./CountryCombo";

function examplePlaceholder(country: string): string {
  try {
    const ex = getExampleNumber(country as CountryCode, phoneExamples);
    return ex?.formatNational() ?? "";
  } catch {
    return "";
  }
}

function formatPhone(raw: string, country: string): string {
  if (!raw) return "";
  try {
    return new AsYouType(country as CountryCode).input(raw);
  } catch {
    return raw;
  }
}

// Returns true if adding more digits would exceed the country's max length.
function isTooLong(raw: string, country: string): boolean {
  try {
    return validatePhoneNumberLength(raw, country as CountryCode) === "TOO_LONG";
  } catch {
    return false;
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
  invalid,
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
  invalid?: boolean;
}) {
  const display = useMemo(() => formatPhone(value, country), [value, country]);
  const dynamicPlaceholder = useMemo(
    () => placeholder ?? examplePlaceholder(country) ?? "123 456 789",
    [country, placeholder],
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-[var(--color-text)]"
      >
        {label}
        {required && <span className="text-[var(--color-primary)]"> *</span>}
      </label>
      <div className="flex min-w-0 gap-2">
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
            // Reject input that would exceed the country's max length.
            if (isTooLong(raw, country)) return;
            onChange(formatPhone(raw, country));
          }}
          placeholder={dynamicPlaceholder}
          className={`h-[42px] w-full min-w-0 rounded-lg border bg-white px-3 text-sm outline-none transition focus:ring-2 ${invalid ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"}`}
        />
      </div>
    </div>
  );
}
