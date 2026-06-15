import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

// Full ISO-3166 alpha-2 list supported by libphonenumber-js (~250 entries).
export const COUNTRY_CODES: CountryCode[] = getCountries();

export function flagEmoji(code: string): string {
  if (!code || code.length !== 2) return "🌐";
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1a5 + c.charCodeAt(0)))
    .join("");
}

export function callingCode(code: string): string {
  try {
    return "+" + getCountryCallingCode(code as CountryCode);
  } catch {
    return "";
  }
}

export function countryName(code: string, locale: string): string {
  try {
    return (
      new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code
    );
  } catch {
    return code;
  }
}

export function sortedCountries(
  locale: string,
): { code: CountryCode; name: string }[] {
  return COUNTRY_CODES.map((c) => ({ code: c, name: countryName(c, locale) }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}
