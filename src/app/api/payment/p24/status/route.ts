import { NextResponse } from "next/server";
import { p24Config, p24Verify, signVerify } from "@/lib/p24";
import { priceBreakdown } from "@/data/packages";
import type { PackageId } from "@/types";

// P24 calls this URL (urlStatus) after a payment. We validate the notification
// signature, confirm the expected amount, then verify the transaction with P24.
// MVP: on success we just acknowledge (and could notify by email/Telegram).
// TODO(backend): grant cabinet access / record the order in the real backend.

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });

  const { crc } = p24Config();
  const sessionId: string = body.sessionId ?? "";
  const orderId: number = Number(body.orderId ?? 0);
  const amount: number = Number(body.amount ?? 0);
  const currency: string = body.currency ?? "PLN";
  const sign: string = body.sign ?? "";

  // Re-derive expected BRUTTO amount from the package encoded in sessionId.
  const pkgId = sessionId.split("_")[0] as PackageId;
  const breakdown = priceBreakdown(pkgId);
  const expectedAmount = breakdown ? Math.round(breakdown.brutto * 100) : null;

  // 1. Validate notification signature.
  const expectedSign = signVerify({ sessionId, orderId, amount, currency, crc });
  if (!sign || sign !== expectedSign) {
    return NextResponse.json({ ok: false, error: "bad_sign" }, { status: 400 });
  }

  // 2. Confirm the amount matches the expected package price.
  if (expectedAmount !== null && amount !== expectedAmount) {
    return NextResponse.json({ ok: false, error: "amount_mismatch" }, { status: 400 });
  }

  // 3. Verify the transaction with P24.
  const verified = await p24Verify({ sessionId, orderId, amount, currency });
  if (!verified) {
    return NextResponse.json({ ok: false, error: "verify_failed" }, { status: 400 });
  }

  // Paid & verified. P24 only needs HTTP 200 here.
  // TODO(backend): persist order + grant access + send confirmation email.
  return NextResponse.json({ ok: true });
}
