"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/store/auth";

function Inner() {
  const t = useTranslations("auth");
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const verify = useAuth((s) => s.verify);
  const hasHydrated = useAuth((s) => s.hasHydrated);
  const users = useAuth((s) => s.users);

  const user = users.find((u) => u.verifyToken === token);
  // Phase is derived from store state (no setState-in-effect).
  const phase: "verifying" | "success" | "fail" = !hasHydrated
    ? "verifying"
    : !token || !user
      ? "fail"
      : user.verified
        ? "success"
        : "verifying";

  // Trigger the store mutation when we have an unverified matching user.
  useEffect(() => {
    if (hasHydrated && user && !user.verified) verify(token);
  }, [hasHydrated, user, token, verify]);

  // On success, auto-redirect into the cabinet shortly after.
  useEffect(() => {
    if (phase !== "success") return;
    const id = setTimeout(() => router.push("/dashboard"), 1800);
    return () => clearTimeout(id);
  }, [phase, router]);

  return (
    <Card className="mt-6">
      <CardBody className="space-y-5 text-center">
        {phase === "verifying" && (
          <>
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-[var(--color-primary)]" />
            <p className="text-[var(--color-muted)]">{t("verify.verifying")}</p>
          </>
        )}

        {phase === "success" && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--color-success)]" />
            <h1 className="text-xl font-bold">{t("verify.success")}</h1>
            <p className="text-[var(--color-muted)]">{t("verify.successBody")}</p>
            <Link href="/dashboard" className="inline-block">
              <Button>
                {t("verify.enter")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </>
        )}

        {phase === "fail" && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-[var(--color-danger)]" />
            <h1 className="text-xl font-bold">{t("verify.failTitle")}</h1>
            <p className="text-[var(--color-muted)]">{t("verify.failBody")}</p>
            <div className="flex justify-center gap-3">
              <Link href="/login">
                <Button variant="outline">{t("login.title")}</Button>
              </Link>
              <Link href="/register">
                <Button>{t("register.submit")}</Button>
              </Link>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}

export function VerifyEmail() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
