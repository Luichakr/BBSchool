"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import {
  AUCTION_REGIONS,
  AUCTION_BRAND_COLORS,
  type AuctionRegionId,
} from "@/data/auctions";

type Labels = {
  regions: Record<string, string>;
  notes: Record<string, string>;
  countLabel: string;
};

/** initials from a brand name, e.g. "Stark Auto Sales" -> "SA", "kvdcars" -> "kv" */
function initials(name: string): string {
  const clean = name.replace(/\.(ca|de|fi|uk|com)$/i, "");
  const words = clean.split(/[\s.]+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return clean.slice(0, 2);
}

function badgeColor(name: string): string {
  return AUCTION_BRAND_COLORS[name] ?? "#ff5c00";
}

export function AuctionsByRegion({ labels }: { labels: Labels }) {
  const [active, setActive] = useState<AuctionRegionId>("usa");
  const region = AUCTION_REGIONS.find((r) => r.id === active)!;

  return (
    <div>
      {/* Region tabs */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10">
        {AUCTION_REGIONS.map((r) => {
          const isActive = r.id === active;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(r.id)}
              className={`relative -mb-px flex items-center gap-2 pb-3 pt-1 text-sm font-medium transition ${
                isActive
                  ? "text-[var(--color-primary)]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              <span className="text-base">{r.flag}</span>
              {labels.regions[r.id]}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--color-primary)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Phone / request note */}
      {region.note && (
        <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80">
          <Info className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
          {labels.notes[region.note]}
        </div>
      )}

      {/* Count */}
      <p className="mt-5 text-sm text-white/55">
        {labels.countLabel}:{" "}
        <span className="font-semibold text-white">
          {region.auctions.length}
        </span>
      </p>

      {/* Grid of auction cards */}
      {region.auctions.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {region.auctions.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-7 text-center transition hover:border-[var(--color-primary)]/40 hover:bg-white/[0.06]"
            >
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0b1120] text-lg font-extrabold ring-1 ring-white/10"
                style={{ color: badgeColor(name) }}
              >
                {initials(name)}
              </span>
              <span className="text-sm text-white/85">{name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
