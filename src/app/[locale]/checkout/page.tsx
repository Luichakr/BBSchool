"use client";

import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/sections/PageHeader";

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
  const router = useRouter();
  const sp = useSearchParams();

  const queryPkg = sp.get("package");
  const initial: PkgId = VALID.includes(queryPkg as PkgId)
    ? (queryPkg as PkgId)
    : "pro";

  const [step, setStep] = useState(0);
  const [pkg, setPkg] = useState<PkgId>(initial);
  const confirms = (t.raw as (k: string) => unknown)(
    "checkout.confirms",
  ) as string[];
  const [checked, setChecked] = useState<boolean[]>(confirms.map(() => false));
  const allConfirmed = checked.every(Boolean);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const steps = [
    t("checkout.step1"),
    t("checkout.step2"),
    t("checkout.step3"),
    t("checkout.step4"),
  ];

  const handleFinish = () => {
    router.push("/checkout/success");
  };

  const finalCta = pkg === "pro" ? t("cta.buyPro") : t("cta.buyBasic");

  return (
    <>
      <PageHeader title={t("checkout.title")} />
      <Section className="!pt-0">
        <Container className="max-w-3xl">
          <ol className="flex flex-wrap gap-2 mb-6">
            {steps.map((s, i) => (
              <li key={i}>
                <Badge
                  variant={
                    i === step ? "primary" : i < step ? "success" : "neutral"
                  }
                >
                  {i + 1}. {s}
                </Badge>
              </li>
            ))}
          </ol>

          <Card>
            <CardBody>
              {step === 0 && (
                <div className="space-y-3">
                  {VALID.map((id) => (
                    <label
                      key={id}
                      className={`flex items-center justify-between gap-4 rounded-lg border p-4 cursor-pointer ${
                        pkg === id
                          ? "border-[var(--color-primary)] bg-[var(--color-accent-soft)]"
                          : "border-[var(--color-border)]"
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
                        />
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label htmlFor="co-name">{t("common.name")}</Label>
                    <Input id="co-name" required />
                  </div>
                  <div>
                    <Label htmlFor="co-last">{t("common.lastName")}</Label>
                    <Input id="co-last" required />
                  </div>
                  <div>
                    <Label htmlFor="co-email">{t("common.email")}</Label>
                    <Input id="co-email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="co-phone">{t("common.phone")}</Label>
                    <Input id="co-phone" type="tel" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="co-country">{t("common.country")}</Label>
                    <Input id="co-country" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <ul className="space-y-3">
                  {confirms.map((c, i) => (
                    <li key={i} className="flex gap-3">
                      <input
                        id={`co-c-${i}`}
                        type="checkbox"
                        checked={checked[i]}
                        onChange={(e) =>
                          setChecked((p) =>
                            p.map((v, j) => (j === i ? e.target.checked : v)),
                          )
                        }
                        className="mt-1.5"
                      />
                      <label htmlFor={`co-c-${i}`} className="text-sm">
                        {c}
                      </label>
                    </li>
                  ))}
                </ul>
              )}

              {step === 3 && (
                <div className="space-y-3 text-sm">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex justify-between">
                      <span>{t(`packages.${pkg}.name`)}</span>
                      <span className="font-semibold">
                        {t(`packages.${pkg}.price`)}
                      </span>
                    </div>
                  </div>
                  <label className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] p-3">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm">
                      {t("checkout.accept.prefix")}{" "}
                      <Link
                        href="/legal/terms"
                        target="_blank"
                        className="text-[var(--color-primary)] underline"
                      >
                        {t("checkout.accept.terms")}
                      </Link>{" "}
                      {t("checkout.accept.and")}{" "}
                      <Link
                        href="/legal/privacy"
                        target="_blank"
                        className="text-[var(--color-primary)] underline"
                      >
                        {t("checkout.accept.privacy")}
                      </Link>
                      .
                    </span>
                  </label>
                  <p className="text-xs text-[var(--color-muted)]">
                    {t("legal.disclaimer")}
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-between gap-3">
                <Button
                  variant="outline"
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  {t("common.back")}
                </Button>
                {step < 3 ? (
                  <Button
                    type="button"
                    disabled={step === 2 && !allConfirmed}
                    onClick={() => setStep((s) => s + 1)}
                  >
                    {t("common.next")}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={!termsAccepted}
                    onClick={handleFinish}
                  >
                    {finalCta}
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </Section>
    </>
  );
}
