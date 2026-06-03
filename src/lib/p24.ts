import { createHash } from "crypto";

// Przelewy24 REST API v1 integration.
// Credentials come from env (never commit them):
//   P24_MERCHANT_ID, P24_POS_ID (default = merchant id), P24_CRC, P24_API_KEY,
//   P24_SANDBOX ("true" = sandbox.przelewy24.pl, otherwise secure.przelewy24.pl)
// Docs: https://developers.przelewy24.pl/

export const P24_SANDBOX = process.env.P24_SANDBOX !== "false";

export const P24_BASE = P24_SANDBOX
  ? "https://sandbox.przelewy24.pl"
  : "https://secure.przelewy24.pl";

export function p24Config() {
  const merchantId = Number(process.env.P24_MERCHANT_ID || 0);
  const posId = Number(process.env.P24_POS_ID || process.env.P24_MERCHANT_ID || 0);
  const crc = process.env.P24_CRC || "";
  const apiKey = process.env.P24_API_KEY || "";
  return { merchantId, posId, crc, apiKey };
}

export function p24Configured(): boolean {
  const { merchantId, posId, crc, apiKey } = p24Config();
  return Boolean(merchantId && posId && crc && apiKey);
}

function sha384(input: string): string {
  return createHash("sha384").update(input, "utf8").digest("hex");
}

/** Sign for transaction/register — strict key order required by P24. */
export function signRegister(args: {
  sessionId: string;
  merchantId: number;
  amount: number; // grosze
  currency: string;
  crc: string;
}): string {
  const json = JSON.stringify({
    sessionId: args.sessionId,
    merchantId: args.merchantId,
    amount: args.amount,
    currency: args.currency,
    crc: args.crc,
  });
  return sha384(json);
}

/** Sign for status notification + transaction/verify. */
export function signVerify(args: {
  sessionId: string;
  orderId: number;
  amount: number;
  currency: string;
  crc: string;
}): string {
  const json = JSON.stringify({
    sessionId: args.sessionId,
    orderId: args.orderId,
    amount: args.amount,
    currency: args.currency,
    crc: args.crc,
  });
  return sha384(json);
}

function authHeader(): string {
  const { posId, apiKey } = p24Config();
  return "Basic " + Buffer.from(`${posId}:${apiKey}`).toString("base64");
}

export type RegisterInput = {
  sessionId: string;
  amount: number; // grosze
  description: string;
  email: string;
  urlReturn: string;
  urlStatus: string;
  currency?: string;
};

/** Registers a transaction; returns the redirect URL to P24 payment page. */
export async function p24Register(
  input: RegisterInput,
): Promise<{ ok: true; redirectUrl: string; token: string } | { ok: false; error: string }> {
  const { merchantId, posId, crc } = p24Config();
  const currency = input.currency ?? "PLN";
  const sign = signRegister({
    sessionId: input.sessionId,
    merchantId,
    amount: input.amount,
    currency,
    crc,
  });

  const body = {
    merchantId,
    posId,
    sessionId: input.sessionId,
    amount: input.amount,
    currency,
    description: input.description,
    email: input.email,
    country: "PL",
    language: "pl",
    urlReturn: input.urlReturn,
    urlStatus: input.urlStatus,
    sign,
    encoding: "UTF-8",
  };

  try {
    const res = await fetch(`${P24_BASE}/api/v1/transaction/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => null);
    const token = data?.data?.token;
    if (!res.ok || !token) {
      return { ok: false, error: data?.error || `register failed (${res.status})` };
    }
    return { ok: true, token, redirectUrl: `${P24_BASE}/trnRequest/${token}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "register error" };
  }
}

/** Verifies a transaction after the status notification (urlStatus). */
export async function p24Verify(args: {
  sessionId: string;
  orderId: number;
  amount: number;
  currency?: string;
}): Promise<boolean> {
  const { merchantId, posId, crc } = p24Config();
  const currency = args.currency ?? "PLN";
  const sign = signVerify({
    sessionId: args.sessionId,
    orderId: args.orderId,
    amount: args.amount,
    currency,
    crc,
  });
  try {
    const res = await fetch(`${P24_BASE}/api/v1/transaction/verify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify({
        merchantId,
        posId,
        sessionId: args.sessionId,
        amount: args.amount,
        currency,
        orderId: args.orderId,
        sign,
      }),
    });
    const data = await res.json().catch(() => null);
    return res.ok && data?.data?.status === "success";
  } catch {
    return false;
  }
}
