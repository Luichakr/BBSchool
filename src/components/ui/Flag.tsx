// Country flag rendered as an SVG from flagcdn.com (free CDN, covers all
// ISO-3166 alpha-2 codes). Avoids OS-dependent emoji rendering.
export function Flag({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  if (!code || code.length !== 2) return null;
  const c = code.toLowerCase();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${c}.svg`}
      width={20}
      height={15}
      alt=""
      aria-hidden
      loading="lazy"
      className={`inline-block shrink-0 rounded-[2px] object-cover ${className ?? ""}`}
      style={{ width: 20, height: 15 }}
    />
  );
}
