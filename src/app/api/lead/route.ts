import { NextResponse } from "next/server";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(2).max(200),
  lastName: z.string().max(200).optional(),
  email: z.string().email(),
  phone: z.string().min(5).max(40),
  phoneRaw: z.string().min(5).max(40).optional(),
  phoneE164: z.string().min(5).max(40).optional(),
  phoneCountry: z.string().max(8).optional(),
  country: z.string().max(200).optional(),
  city: z.string().max(200).optional(),
  preferredMessenger: z.string().max(50).optional(),
  preferredContactTime: z.string().max(50).optional(),
  requestType: z.string().max(50),
  clientGoal: z.string().max(50).optional(),
  packageInterest: z.string().max(50).optional(),
  budget: z.string().max(50).optional(),
  hasLot: z.boolean().optional(),
  lotUrl: z.string().url().max(2000).optional(),
  message: z.string().max(5000).optional(),
  sourcePage: z.string().max(500).optional(),
  pageUrl: z.string().max(2000).optional(),
  referrer: z.string().max(2000).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
});

type Lead = z.infer<typeof LeadSchema>;

function makeLeadId() {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

async function sendTelegram(lead: Lead, leadId: string) {
  const token = process.env.LEAD_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.LEAD_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  const text = [
    `🟦 New lead: ${leadId}`,
    `Name: ${lead.name} ${lead.lastName ?? ""}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phoneE164 ?? lead.phone}`,
    `City: ${lead.city ?? "—"}`,
    `Country: ${lead.country ?? "—"}`,
    `Request: ${lead.requestType}`,
    `Goal: ${lead.clientGoal ?? "—"}`,
    `Package: ${lead.packageInterest ?? "—"}`,
    `Budget: ${lead.budget ?? "—"}`,
    `Has lot: ${lead.hasLot ? "yes" : "no"}`,
    lead.lotUrl ? `Lot: ${lead.lotUrl}` : "",
    `Source: ${lead.sourcePage ?? lead.pageUrl ?? "—"}`,
    lead.utmSource ? `UTM: ${lead.utmSource}/${lead.utmMedium ?? "-"}/${lead.utmCampaign ?? "-"}` : "",
    lead.message ? `\n${lead.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
  } catch {
    // swallow — we don't want a failed Telegram to block the lead
  }
}

async function postWebhook(lead: Lead, leadId: string) {
  const url = process.env.LEAD_CRM_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, ...lead }),
    });
  } catch {
    // ignore
  }
}

async function postSheets(lead: Lead, leadId: string) {
  const url = process.env.LEAD_GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, ...lead }),
    });
  } catch {
    // ignore
  }
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }
  const parsed = LeadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const lead = parsed.data;
  const leadId = makeLeadId();

  if (process.env.NODE_ENV !== "production") {
    console.log("[lead]", leadId, lead);
  }

  // Fire-and-forget integrations — the user response doesn't wait on them
  // beyond the small fetch overhead in this handler. Failures are swallowed
  // so a slow Telegram doesn't break the form UX.
  await Promise.all([
    sendTelegram(lead, leadId),
    postWebhook(lead, leadId),
    postSheets(lead, leadId),
  ]);

  return NextResponse.json({ ok: true, leadId });
}
