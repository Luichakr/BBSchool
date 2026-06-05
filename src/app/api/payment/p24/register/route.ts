import { NextResponse } from "next/server";
import { z } from "zod";
import { p24Register, p24Configured } from "@/lib/p24";
import { priceBreakdown } from "@/data/packages";

const Schema = z.object({
  package: z.enum(["basic", "pro", "partner"]),
  email: z.string().email(),
  locale: z.enum(["pl", "uk", "ru", "en"]).optional(),
});

function originFrom(req: Request): string {
  const env = process.env.NEXT_PUBLIC_ACADEMY_ORIGIN;
  if (env) return env.replace(/\/$/, "");
  const h = req.headers;
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "academy.bidbidders.com";
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  if (!p24Configured()) {
    return NextResponse.json(
      { ok: false, error: "payment_not_configured" },
      { status: 503 },
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }
  const { package: pkgId, email, locale = "pl" } = parsed.data;

  // Charge BRUTTO (net + 23% VAT) — that's what the customer pays.
  const breakdown = priceBreakdown(pkgId);
  if (!breakdown) {
    return NextResponse.json({ ok: false, error: "unknown_package" }, { status: 400 });
  }
  const amount = Math.round(breakdown.brutto * 100); // grosze

  // Encode the package into sessionId so the status webhook can re-derive the
  // expected amount without a database (MVP).
  const rand = Math.random().toString(36).slice(2, 10);
  const sessionId = `${pkgId}_${Date.now()}_${rand}`;

  const origin = originFrom(req);
  const result = await p24Register({
    sessionId,
    amount,
    description: `BidBIDDERS Academy — ${pkgId.toUpperCase()}`,
    email,
    urlReturn: `${origin}/${locale}/checkout/success?sid=${sessionId}`,
    urlStatus: `${origin}/api/payment/p24/status`,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, redirectUrl: result.redirectUrl });
}
