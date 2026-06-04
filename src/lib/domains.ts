// Single source of truth for the BidBIDDERS subdomains.
// One Next.js deployment serves two domains, split by hostname in middleware:
//   academy.bidbidders.com  → marketing + course (public site)
//   client.bidbidders.com   → client cabinet (auth + dashboard)
// CRM lives in a separate project at crm.bidbidders.com.

export const ACADEMY_HOST = "academy.bidbidders.com";
export const CABINET_HOST = "client.bidbidders.com";

export const ACADEMY_ORIGIN =
  process.env.NEXT_PUBLIC_ACADEMY_ORIGIN ?? `https://${ACADEMY_HOST}`;
export const CABINET_ORIGIN =
  process.env.NEXT_PUBLIC_CABINET_ORIGIN ?? `https://${CABINET_HOST}`;
export const CRM_ORIGIN =
  process.env.NEXT_PUBLIC_CRM_ORIGIN ?? "https://crm.bidbidders.com";

// Path sections (after the /[locale] prefix) that belong to the cabinet domain.
// NOTE: login/register/verify-email are intentionally kept on academy while
// client.bidbidders.com still runs the legacy BIDDERS_2 platform (no /login route).
// Add them back once client.bidbidders.com serves our academy code.
export const CABINET_SECTIONS = [
  "dashboard",
] as const;

const LOCALE_RE = /^\/(pl|uk|ru|en)(?=\/|$)/;

/** Strip the leading /[locale] segment, returning the rest (always leading "/"). */
export function stripLocale(pathname: string): string {
  const rest = pathname.replace(LOCALE_RE, "");
  return rest === "" ? "/" : rest;
}

/** First path section after the locale, e.g. "/ru/dashboard/cars" → "dashboard". */
export function firstSection(pathname: string): string {
  const rest = stripLocale(pathname);
  return rest.split("/").filter(Boolean)[0] ?? "";
}

/** True when the path belongs to the client cabinet (dashboard/auth). */
export function isCabinetPath(pathname: string): boolean {
  return (CABINET_SECTIONS as readonly string[]).includes(
    firstSection(pathname),
  );
}

/** True when the path is just the locale root, e.g. "/ru" or "/ru/". */
export function isLocaleRoot(pathname: string): boolean {
  return stripLocale(pathname) === "/";
}
