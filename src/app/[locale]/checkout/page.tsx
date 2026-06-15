"use client";

import { Suspense, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Check,
  User,
  Mail,
  Phone,
  Globe,
  Tag,
  Zap,
  ShieldCheck,
  Headphones,
  Lock,
} from "lucide-react";

type PkgId = "basic" | "pro";
const VALID: PkgId[] = ["basic", "pro"];

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const sp = useSearchParams();

  const queryPkg = sp.get("package");
  const initial: PkgId = VALID.includes(queryPkg as PkgId)
    ? (queryPkg as PkgId)
    : "pro";

  const [step, setStep] = useState(0);
  const [pkg, setPkg] = useState<PkgId>(initial);

  // Step 1 — buyer details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [promo, setPromo] = useState("");
  const [needInvoice, setNeedInvoice] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Step 2 — risk acknowledgements
  const confirms = (t.raw as (k: string) => unknown)(
    "checkout.confirms",
  ) as string[];
  const [checked, setChecked] = useState<boolean[]>(confirms.map(() => false));
  const allConfirmed = checked.every(Boolean);

  // Payment
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const step1Valid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    emailValid &&
    termsAccepted;

  const steps = [
    t("checkout.step1"),
    t("checkout.step2"),
    t("checkout.step3"),
    t("checkout.step4"),
  ];

  const handleFinish = async () => {
    setPayError(null);
    if (!emailValid) {
      setPayError(t("checkout.errors.emailRequired"));
      setStep(1);
      return;
    }
    setPaying(true);
    try {
      const res = await fetch("/api/payment/p24/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: pkg, email, locale }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      const code: string = data?.error ?? "unknown";
      if (code === "payment_not_configured") {
        setPaying(false);
        router.push("/checkout/success");
        return;
      }
      setPayError(t("checkout.errors.paymentFailed") + " (" + code + ")");
    } catch {
      setPayError(t("checkout.errors.paymentFailed") + " (network)");
    }
    setPaying(false);
  };

  const canGoNext =
    (step === 0 && VALID.includes(pkg)) ||
    (step === 1 && step1Valid) ||
    (step === 2 && allConfirmed);

  const nextCtaKey =
    step === 0
      ? "checkout.cta.nextToData"
      : step === 1
        ? "checkout.cta.nextToTerms"
        : step === 2
          ? "checkout.cta.nextToPayment"
          : "";

  const finalCta = pkg === "pro" ? t("cta.buyPro") : t("cta.buyBasic");

  return (
    <Section>
      <Container className="max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {t("checkout.title")}
        </h1>

        {/* Stepper */}
        <ol className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-3">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={i} className="flex items-center gap-2 shrink-0">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                    done
                      ? "bg-[var(--color-success)] text-white"
                      : active
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--color-border)] text-[var(--color-muted)]"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={`text-sm ${
                    active
                      ? "font-semibold text-[var(--color-primary)]"
                      : done
                        ? "text-[var(--color-success)]"
                        : "text-[var(--color-muted)]"
                  }`}
                >
                  {i + 1}. {s}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* === LEFT COLUMN === */}
          <div className="space-y-6">
            {/* STEP 0 — package picker */}
            {step === 0 && (
              <Card>
                <CardBody>
                  <h2 className="mb-4 text-lg font-semibold">
                    {t("checkout.step1")}
                  </h2>
                  <div className="space-y-3">
                    {VALID.map((id) => (
                      <label
                        key={id}
                        className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 transition ${
                          pkg === id
                            ? "border-[var(--color-primary)] bg-[var(--color-accent-soft)]"
                            : "border-[var(--color-border)] hover:border-[var(--color-primary)]/40"
                        }`}
                      >
                        <div>
                          <div className="font-semibold">
                            {t(`packages.${id}.name`)}
                          </div>
                          <div className="text-sm text-[var(--color-muted)]">
                            {t(`packages.${id}.for`)}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="font-bold">
                            {t(`packages.${id}.price`)}
                          </div>
                          <input
                            type="radio"
                            name="pkg"
                            checked={pkg === id}
                            onChange={() => setPkg(id)}
                            aria-label={t(`packages.${id}.name`)}
                            className="h-4 w-4 accent-[var(--color-primary)]"
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* STEP 1 — buyer details */}
            {step === 1 && (
              <>
                {/* Selected package card */}
                <Card>
                  <CardBody>
                    <h2 className="mb-3 text-sm font-semibold text-[var(--color-muted)]">
                      {t("checkout.selectedPackage")}
                    </h2>
                    <div
                      className={
                        "flex items-start gap-3 rounded-lg border border-[var(--color-primary)] bg-[var(--color-accent-soft)] p-4"
                      }
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                        <User className="h-5 w-5 text-[var(--color-primary)]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="font-semibold">
                            {t(`packages.${pkg}.name`)}
                          </div>
                          <div className="font-bold">
                            {t(`packages.${pkg}.price`)}
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-[var(--color-muted)]">
                          {t(`packages.${pkg}.for`)}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success)]/15 px-2 py-0.5 text-xs font-medium text-[var(--color-success)]">
                            <Check className="h-3 w-3" />
                            {t("checkout.selectedBadge")}
                          </span>
                          <button
                            type="button"
                            onClick={() => setStep(0)}
                            className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                          >
                            {t("checkout.changePackage")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Buyer form */}
                <Card>
                  <CardBody>
                    <h2 className="mb-5 text-lg font-semibold">
                      {t("checkout.enterData")}
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        id="co-name"
                        label={t("checkout.fields.firstName")}
                        required
                        icon={<User className="h-4 w-4" />}
                        placeholder={t("checkout.fields.firstNamePh")}
                        value={firstName}
                        onChange={setFirstName}
                      />
                      <Field
                        id="co-last"
                        label={t("checkout.fields.lastName")}
                        required
                        icon={<User className="h-4 w-4" />}
                        placeholder={t("checkout.fields.lastNamePh")}
                        value={lastName}
                        onChange={setLastName}
                      />
                      <Field
                        id="co-email"
                        label={t("checkout.fields.email")}
                        required
                        type="email"
                        icon={<Mail className="h-4 w-4" />}
                        placeholder={t("checkout.fields.emailPh")}
                        value={email}
                        onChange={setEmail}
                      />
                      <Field
                        id="co-phone"
                        label={t("checkout.fields.phone")}
                        type="tel"
                        icon={<Phone className="h-4 w-4" />}
                        placeholder={t("checkout.fields.phonePh")}
                        value={phone}
                        onChange={setPhone}
                      />
                      <SelectField
                        id="co-country"
                        label={t("checkout.fields.country")}
                        required
                        icon={<Globe className="h-4 w-4" />}
                        placeholder={t("checkout.fields.countryPh")}
                        value={country}
                        onChange={setCountry}
                        options={[
                          { value: "PL", label: t("checkout.countries.pl") },
                          { value: "UA", label: t("checkout.countries.ua") },
                          { value: "RU", label: t("checkout.countries.ru") },
                          { value: "DE", label: t("checkout.countries.de") },
                          { value: "LT", label: t("checkout.countries.lt") },
                          {
                            value: "OTHER",
                            label: t("checkout.countries.other"),
                          },
                        ]}
                      />
                      <Field
                        id="co-promo"
                        label={`${t("checkout.fields.promo")} (${t("checkout.fields.optional")})`}
                        icon={<Tag className="h-4 w-4" />}
                        placeholder={t("checkout.fields.promoPh")}
                        value={promo}
                        onChange={setPromo}
                      />
                    </div>

                    {/* Invoice toggle */}
                    <label className="mt-5 flex cursor-pointer items-start gap-3">
                      <span
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                          needInvoice
                            ? "bg-[var(--color-primary)]"
                            : "bg-[var(--color-border)]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={needInvoice}
                          onChange={(e) => setNeedInvoice(e.target.checked)}
                          className="sr-only"
                        />
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                            needInvoice ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </span>
                      <span className="text-sm">
                        <span className="font-medium">
                          {t("checkout.invoice.toggle")}
                        </span>
                        <span className="block text-xs text-[var(--color-muted)]">
                          {t("checkout.invoice.hint")}
                        </span>
                      </span>
                    </label>

                    {/* Terms checkbox */}
                    <label className="mt-5 flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
                      />
                      <span className="text-sm">
                        {t("checkout.agreePrefix")}{" "}
                        <Link
                          href="/legal/terms"
                          target="_blank"
                          className="text-[var(--color-primary)] underline"
                        >
                          {t("checkout.agreeTermsLink")}
                        </Link>{" "}
                        {t("checkout.agreeMid")}{" "}
                        <Link
                          href="/legal/privacy"
                          target="_blank"
                          className="text-[var(--color-primary)] underline"
                        >
                          {t("checkout.agreePrivacyLink")}
                        </Link>
                        .
                      </span>
                    </label>

                    <p className="mt-4 text-xs text-[var(--color-muted)]">
                      <span className="text-[var(--color-primary)]">*</span>{" "}
                      {t("checkout.requiredFields")}
                    </p>
                  </CardBody>
                </Card>

                {/* Trust row */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <TrustBadge
                    icon={<Zap className="h-5 w-5" />}
                    title={t("checkout.trust.instant.title")}
                    desc={t("checkout.trust.instant.desc")}
                  />
                  <TrustBadge
                    icon={<ShieldCheck className="h-5 w-5" />}
                    title={t("checkout.trust.secure.title")}
                    desc={t("checkout.trust.secure.desc")}
                  />
                  <TrustBadge
                    icon={<Headphones className="h-5 w-5" />}
                    title={t("checkout.trust.support.title")}
                    desc={t("checkout.trust.support.desc")}
                  />
                </div>
              </>
            )}

            {/* STEP 2 — risk confirms */}
            {step === 2 && (
              <Card>
                <CardBody>
                  <h2 className="mb-4 text-lg font-semibold">
                    {t("checkout.step3")}
                  </h2>
                  <p className="mb-4 text-sm text-[var(--color-muted)]">
                    {t("checkout.confirmsIntro")}
                  </p>
                  <ul className="space-y-3">
                    {confirms.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] p-3"
                      >
                        <input
                          id={`co-c-${i}`}
                          type="checkbox"
                          checked={checked[i]}
                          onChange={(e) =>
                            setChecked((p) =>
                              p.map((v, j) =>
                                j === i ? e.target.checked : v,
                              ),
                            )
                          }
                          className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
                        />
                        <label htmlFor={`co-c-${i}`} className="text-sm">
                          {c}
                        </label>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            )}

            {/* STEP 3 — payment confirm */}
            {step === 3 && (
              <Card>
                <CardBody>
                  <h2 className="mb-4 text-lg font-semibold">
                    {t("checkout.step4")}
                  </h2>

                  <div className="rounded-lg bg-gray-50 p-4 text-sm">
                    <Row
                      left={t(`packages.${pkg}.name`)}
                      right={t(`packages.${pkg}.priceNet`)}
                    />
                    <Row
                      mute
                      left={`${t("vatLabels.vat")} 23%`}
                      right={t(`packages.${pkg}.priceVat`)}
                    />
                    <Row
                      mute
                      left={t("checkout.summary.deliveryLabel")}
                      right={t("checkout.summary.deliveryValue")}
                    />
                    <div className="mt-3 flex justify-between border-t border-[var(--color-border)] pt-3">
                      <span className="font-semibold">
                        {t("checkout.summary.totalLabel")} (
                        {t("vatLabels.brutto")})
                      </span>
                      <span className="font-bold text-[var(--color-primary)]">
                        {t(`packages.${pkg}.price`)}
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-[var(--color-muted)]">
                      {t("checkout.summary.terminLabel")}:{" "}
                      <span className="text-[var(--color-text)]">
                        {t("checkout.summary.terminValue")}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[var(--color-muted)]">
                    {t("legal.disclaimer")}
                  </p>

                  {payError && (
                    <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                      {payError}
                    </div>
                  )}
                </CardBody>
              </Card>
            )}
          </div>

          {/* === RIGHT SIDEBAR — Order summary === */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card>
              <CardBody>
                <h2 className="mb-4 text-lg font-semibold">
                  {t("checkout.orderTitle")}
                </h2>

                <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
                    <User className="h-4 w-4 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="font-semibold">
                        {t(`packages.${pkg}.name`)}
                      </div>
                      <div className="font-bold">
                        {t(`packages.${pkg}.price`)}
                      </div>
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--color-muted)]">
                      {t(`packages.${pkg}.for`)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <Row
                    left={t("checkout.summary.sumLabel")}
                    right={t(`packages.${pkg}.priceNet`)}
                  />
                  <Row
                    left={`${t("vatLabels.vat")} (23%)`}
                    right={t(`packages.${pkg}.priceVat`)}
                  />
                  <Row
                    left={t("checkout.summary.deliveryLabel")}
                    right={t("checkout.summary.deliveryValue")}
                  />
                </div>

                <div className="mt-4 flex items-baseline justify-between border-t border-[var(--color-border)] pt-4">
                  <span className="font-semibold">
                    {t("checkout.summary.totalLabel")}
                  </span>
                  <span className="text-2xl font-bold">
                    {t(`packages.${pkg}.price`)}
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-lg bg-[var(--color-accent-soft)] p-3 text-xs">
                  <Zap className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <span>{t("checkout.instantAccessNote")}</span>
                </div>

                <div className="mt-5 space-y-2">
                  {step < 3 ? (
                    <Button
                      type="button"
                      variant="primary"
                      className="w-full"
                      disabled={!canGoNext}
                      onClick={() => setStep((s) => s + 1)}
                    >
                      {nextCtaKey ? t(nextCtaKey) : t("common.next")}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="primary"
                      className="w-full"
                      disabled={!emailValid || paying}
                      onClick={handleFinish}
                    >
                      {paying ? t("common.loading") : finalCta}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={step === 0}
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                  >
                    {t("common.back")}
                  </Button>
                </div>

                <div className="mt-5 flex items-start gap-2 text-xs text-[var(--color-muted)]">
                  <Lock className="h-4 w-4 shrink-0" />
                  <span>{t("checkout.dataProtected")}</span>
                </div>
              </CardBody>
            </Card>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  id,
  label,
  required,
  type = "text",
  icon,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-[var(--color-text)]"
      >
        {label}
        {required && <span className="text-[var(--color-primary)]"> *</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-lg border border-[var(--color-border)] bg-white py-2.5 pr-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 ${icon ? "pl-9" : "pl-3"}`}
        />
      </div>
    </div>
  );
}

function SelectField({
  id,
  label,
  required,
  icon,
  placeholder,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-[var(--color-text)]"
      >
        {label}
        {required && <span className="text-[var(--color-primary)]"> *</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
            {icon}
          </span>
        )}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`w-full appearance-none rounded-lg border border-[var(--color-border)] bg-white py-2.5 pr-9 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 ${icon ? "pl-9" : "pl-3"} ${value ? "text-[var(--color-text)]" : "text-[var(--color-muted)]"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
          ▾
        </span>
      </div>
    </div>
  );
}

function Row({
  left,
  right,
  mute,
}: {
  left: string;
  right: string;
  mute?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${mute ? "text-xs text-[var(--color-muted)]" : ""}`}
    >
      <span>{left}</span>
      <span className={mute ? "text-[var(--color-text)]" : "font-medium"}>
        {right}
      </span>
    </div>
  );
}

function TrustBadge({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-white p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-[var(--color-muted)]">{desc}</div>
      </div>
    </div>
  );
}
