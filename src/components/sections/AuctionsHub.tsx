import { AUCTION_BRAND_COLORS } from "@/data/auctions";

/**
 * Hub-and-spoke diagram of real auction platforms BidBIDDERS works with.
 * Each node is a circular brand badge (initials in brand color) — consistent
 * with the regional grid on /car-auctions. No external logo files.
 * Desktop (lg+): radial layout with SVG connectors. Below lg: responsive grid.
 */

function initials(name: string): string {
  const clean = name.replace(/\.(ca|de|fi|uk|com)$/i, "");
  const words = clean.split(/[\s.]+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return clean.slice(0, 2);
}

function badgeColor(name: string): string {
  return AUCTION_BRAND_COLORS[name] ?? "#ff5c00";
}

// center-point positions (% of diagram box)
const POS: { x: number; y: number }[] = [
  { x: 31, y: 11 },
  { x: 50, y: 6 },
  { x: 69, y: 11 },
  { x: 13, y: 32 },
  { x: 87, y: 32 },
  { x: 10, y: 55 },
  { x: 90, y: 55 },
  { x: 28, y: 78 },
  { x: 72, y: 78 },
  { x: 50, y: 90 },
  { x: 38, y: 67 },
  { x: 62, y: 67 },
];

const CENTER = { x: 50, y: 47 };

function Badge({ name, size = 56 }: { name: string; size?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-full bg-[#0b1120] font-extrabold ring-1 ring-white/10"
      style={{
        color: badgeColor(name),
        width: size,
        height: size,
        fontSize: size * 0.3,
      }}
    >
      {initials(name)}
    </span>
  );
}

export function AuctionsHub({
  items,
  centerValue,
  centerLabel,
}: {
  items: string[];
  centerValue: string;
  centerLabel: string;
}) {
  const nodes = items.slice(0, 12).map((name, i) => ({
    name,
    x: POS[i]?.x ?? 50,
    y: POS[i]?.y ?? 50,
  }));

  const numMatch = centerValue.match(/^(\S+)\s+(.*)$/);
  const bigNum = numMatch ? numMatch[1] : centerValue;
  const numWord = numMatch ? numMatch[2] : "";

  return (
    <>
      {/* DESKTOP radial diagram */}
      <div className="relative hidden lg:block min-h-[620px]">
        {/* connector lines + anchor dots */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {nodes.map((n, i) => (
            <line
              key={`l${i}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={n.x}
              y2={n.y}
              stroke="var(--color-primary)"
              strokeWidth={0.25}
              strokeOpacity={0.35}
            />
          ))}
          {nodes.map((n, i) => (
            <circle
              key={`c${i}`}
              cx={n.x}
              cy={n.y}
              r={0.5}
              fill="var(--color-primary)"
              fillOpacity={0.6}
            />
          ))}
        </svg>

        {/* center node */}
        <div
          className="absolute z-10 flex h-[150px] w-[150px] flex-col items-center justify-center rounded-3xl border border-[var(--color-primary)]/40 bg-[#0f1a33]/80 text-center shadow-[0_0_50px_-8px_rgba(255,92,0,0.5)] backdrop-blur"
          style={{
            left: `${CENTER.x}%`,
            top: `${CENTER.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="text-3xl font-extrabold leading-none text-[var(--color-primary)]">
            {bigNum}
          </div>
          {numWord && (
            <div className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
              {numWord}
            </div>
          )}
          <div className="mt-1.5 px-3 text-[11px] leading-tight text-white/70">
            {centerLabel}
          </div>
        </div>

        {/* surrounding nodes */}
        {nodes.map((n, i) => (
          <div
            key={i}
            className="absolute z-10 flex w-[120px] flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center backdrop-blur transition hover:border-[var(--color-primary)]/40 hover:bg-white/[0.07]"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Badge name={n.name} size={40} />
            <span className="text-xs leading-tight text-white/85">{n.name}</span>
          </div>
        ))}
      </div>

      {/* MOBILE / TABLET grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:hidden">
        {nodes.map((n, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"
          >
            <Badge name={n.name} size={36} />
            <span className="text-xs leading-tight text-white/85">{n.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
