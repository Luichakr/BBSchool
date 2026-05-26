"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { AlertCircle, Loader2 } from "lucide-react";

type Option = { value: string; label: string };
type PhoneCountry = { value: string; label: string; code: string };

export type LeadFormDefaults = {
  requestType?: string;
  packageInterest?: string;
};

export function LeadForm({
  defaults,
  sourcePage,
  thankYouPath = "/contact/thank-you",
}: {
  defaults?: LeadFormDefaults;
  sourcePage?: string;
  thankYouPath?: string;
}) {
  const t = useTranslations("leadForm");
  const router = useRouter();

  const messengers = t.raw("messengers") as Option[];
  const requestTypes = t.raw("requestTypes") as Option[];
  const packageInterests = t.raw("packageInterests") as Option[];
  const budgets = t.raw("budgets") as Option[];
  const phoneCountries = t.raw("phoneCountries") as PhoneCountry[];
  const contactTimes = t.raw("contactTimes") as Option[];
  const clientGoals = t.raw("clientGoals") as Option[];

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<string>(
    phoneCountries[0]?.value ?? "PL",
  );
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [messenger, setMessenger] = useState(messengers[0]?.value ?? "");
  const [preferredContactTime, setPreferredContactTime] = useState(
    contactTimes[0]?.value ?? "anytime",
  );
  const [requestType, setRequestType] = useState(
    defaults?.requestType ?? requestTypes[0]?.value ?? "",
  );
  const [clientGoal, setClientGoal] = useState(clientGoals[0]?.value ?? "");
  const [packageInterest, setPackageInterest] = useState(
    defaults?.packageInterest ?? packageInterests[0]?.value ?? "",
  );
  const [budget, setBudget] = useState(budgets[budgets.length - 1]?.value ?? "");
  const [hasLot, setHasLot] = useState(false);
  const [lotUrl, setLotUrl] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Auto-collect tracking data at submit time (avoids setState-in-effect)
  function collectTracking() {
    if (typeof window === "undefined") return {};
    const sp = new URLSearchParams(window.location.search);
    return {
      pageUrl: window.location.href,
      referrer: document.referrer || undefined,
      utmSource: sp.get("utm_source") || undefined,
      utmMedium: sp.get("utm_medium") || undefined,
      utmCampaign: sp.get("utm_campaign") || undefined,
      utmContent: sp.get("utm_content") || undefined,
      utmTerm: sp.get("utm_term") || undefined,
    };
  }

  function buildPhone(): { ok: boolean; raw: string; e164?: string } {
    const selected = phoneCountries.find((c) => c.value === phoneCountry);
    const fullRaw =
      selected && selected.code && !phone.startsWith("+")
        ? `${selected.code} ${phone.trim()}`
        : phone.trim();
    const country =
      phoneCountry !== "OTHER" ? (phoneCountry as CountryCode) : undefined;
    const parsed = parsePhoneNumberFromString(fullRaw, country);
    if (!parsed || !parsed.isValid()) return { ok: false, raw: fullRaw };
    return { ok: true, raw: fullRaw, e164: parsed.number };
  }

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = t("errors.required");
    if (!email.trim()) next.email = t("errors.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = t("errors.email");

    if (!phone.trim()) next.phone = t("errors.required");
    else if (!buildPhone().ok) next.phone = t("errors.phone");

    if (hasLot && lotUrl.trim()) {
      try {
        new URL(lotUrl.trim());
      } catch {
        next.lotUrl = t("errors.lotUrl");
      }
    }

    if (!consent) next.consent = t("errors.consent");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const phoneData = buildPhone();
    const payload = {
      name,
      lastName,
      email,
      phone: phoneData.e164 ?? phoneData.raw,
      phoneRaw: phoneData.raw,
      phoneE164: phoneData.e164,
      phoneCountry,
      country,
      city,
      preferredMessenger: messenger,
      preferredContactTime,
      requestType,
      clientGoal,
      packageInterest,
      budget,
      hasLot,
      lotUrl: hasLot ? lotUrl : undefined,
      message,
      sourcePage,
      ...collectTracking(),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setErrors({ form: t("errors.submit") });
        setSubmitting(false);
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!data.ok) {
        setErrors({ form: t("errors.submit") });
        setSubmitting(false);
        return;
      }
    } catch {
      setErrors({ form: t("errors.submit") });
      setSubmitting(false);
      return;
    }

    const qs = new URLSearchParams({
      type: requestType,
      pkg: packageInterest,
    }).toString();
    router.push(`${thankYouPath}?${qs}` as `${typeof thankYouPath}?${string}`);
  };

  return (
    <Card>
      <CardBody>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {errors.form && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[var(--color-danger)] flex gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              {errors.form}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="lf-name">{t("fields.name")}</Label>
              <Input
                id="lf-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-[var(--color-danger)] inline-flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lf-last">{t("fields.lastName")}</Label>
              <Input
                id="lf-last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="lf-email">{t("fields.email")}</Label>
              <Input
                id="lf-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-[var(--color-danger)] inline-flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lf-msg-channel">{t("fields.messenger")}</Label>
              <select
                id="lf-msg-channel"
                className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
                value={messenger}
                onChange={(e) => setMessenger(e.target.value)}
              >
                {messengers.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
            <div>
              <Label htmlFor="lf-pc">{t("fields.phoneCountry")}</Label>
              <select
                id="lf-pc"
                className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
                value={phoneCountry}
                onChange={(e) => setPhoneCountry(e.target.value)}
              >
                {phoneCountries.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="lf-phone">{t("fields.phone")}</Label>
              <Input
                id="lf-phone"
                type="tel"
                placeholder={phoneCountry === "OTHER" ? "+48 500 000 000" : ""}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-[var(--color-danger)] inline-flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="lf-country">{t("fields.country")}</Label>
              <Input
                id="lf-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lf-city">{t("fields.city")}</Label>
              <Input
                id="lf-city"
                placeholder={t("fields.cityPlaceholder")}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="lf-rt">{t("fields.requestType")}</Label>
              <select
                id="lf-rt"
                className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
              >
                {requestTypes.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="lf-goal">{t("fields.clientGoal")}</Label>
              <select
                id="lf-goal"
                className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
                value={clientGoal}
                onChange={(e) => setClientGoal(e.target.value)}
              >
                {clientGoals.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="lf-pi">{t("fields.packageInterest")}</Label>
              <select
                id="lf-pi"
                className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
                value={packageInterest}
                onChange={(e) => setPackageInterest(e.target.value)}
              >
                {packageInterests.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="lf-budget">{t("fields.budget")}</Label>
              <select
                id="lf-budget"
                className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                {budgets.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="lf-time">{t("fields.preferredContactTime")}</Label>
            <select
              id="lf-time"
              className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
              value={preferredContactTime}
              onChange={(e) => setPreferredContactTime(e.target.value)}
            >
              {contactTimes.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] p-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={hasLot}
                onChange={(e) => setHasLot(e.target.checked)}
              />
              {t("fields.hasLot")}
            </label>
            {hasLot && (
              <div className="mt-3">
                <Label htmlFor="lf-loturl">{t("fields.lotUrl")}</Label>
                <Input
                  id="lf-loturl"
                  type="url"
                  placeholder="https://www.copart.com/lot/..."
                  value={lotUrl}
                  onChange={(e) => setLotUrl(e.target.value)}
                  aria-invalid={!!errors.lotUrl}
                />
                {errors.lotUrl && (
                  <p className="mt-1 text-xs text-[var(--color-danger)] inline-flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.lotUrl}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="lf-message">{t("fields.message")}</Label>
            <Textarea
              id="lf-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <input
              id="lf-consent"
              type="checkbox"
              className="mt-1"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={!!errors.consent}
            />
            <label htmlFor="lf-consent" className="text-sm">
              {t("fields.consent")}
            </label>
          </div>
          {errors.consent && (
            <p className="text-xs text-[var(--color-danger)] inline-flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.consent}
            </p>
          )}

          <Button type="submit" className="w-full md:w-auto" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
