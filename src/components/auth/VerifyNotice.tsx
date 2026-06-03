"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MailCheck, Info, ArrowRight } from "lucide-react";
import { useAuth } from "@/store/auth";

function Inner() {
  const t = useTranslations("auth");
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const tokenForEmail = useAuth((s) => s.tokenForEmail);
  const resend = useAuth((s) => s.resend);
  const hasHydrated = useAuth((s) => s.hasHydrated);
  const [resent, setResent] = useState(false);

  const token = hasHydrated ? tokenForEmail(email) : null;

  return (
    <Card className="mt-6">
      <CardBody className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
            <MailCheck className="h-6 w-6 text-[var(--color-primary)]" />
          </span>
          <h1 className="text-xl font-bold">{t("verifyNotice.title")}</h1>
        </div>

        <p className="text-[var(--color-muted)]">
          {t("verifyNotice.body", { email: email || "—" })}
        </p>

        {/* Demo block — real email delivery connects on the backend */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Info className="h-4 w-4 text-[var(--color-primary)]" />
            {t("verifyNotice.demoTitle")}
          </div>
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">
            {t("verifyNotice.demoBody")}
          </p>
          {token && (
            <Link
              href={`/verify-email?token=${token}` as "/verify-email"}
              className="mt-3 inline-block"
            >
              <Button>
                {t("verifyNotice.demoCta")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <button
            type="button"
            onClick={() => {
              resend(email);
              setResent(true);
            }}
            className="text-[var(--color-primary)]"
          >
            {resent ? t("verifyNotice.resent") : t("verifyNotice.resend")}
          </button>
          <Link href="/login" className="text-[var(--color-muted)] hover:text-[var(--color-text)]">
            {t("verifyNotice.backToLogin")}
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

export function VerifyNotice() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
