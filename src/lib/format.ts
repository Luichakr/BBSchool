// Deterministic number formatter — avoids SSR/CSR hydration mismatch caused
// by Number.prototype.toLocaleString() rendering with a different locale on
// the server vs the client browser.
export function fmt(n: number | undefined | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
