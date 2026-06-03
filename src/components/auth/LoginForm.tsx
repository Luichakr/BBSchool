"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAuth, useCurrentUser } from "@/store/auth";

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const hasHydrated = useAuth((s) => s.hasHydrated);
  const currentUser = useCurrentUser();

  // Already logged in → straight to the cabinet.
  useEffect(() => {
    if (hasHydrated && currentUser) router.replace("/dashboard");
  }, [hasHydrated, currentUser, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [needsVerify, setNeedsVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNeedsVerify(false);
    setLoading(true);
    const res = login({ email, password });
    if (res.ok) {
      router.push("/dashboard");
      return;
    }
    setLoading(false);
    setError(t(`errors.${res.error}`));
    if (res.error === "notVerified") setNeedsVerify(true);
  };

  return (
    <Card className="mt-6">
      <CardBody>
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div>
            <Label htmlFor="l-email">{t("login.email")}</Label>
            <Input
              id="l-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="l-pass">{t("login.password")}</Label>
            <Input
              id="l-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-[var(--color-danger)]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {error}
                {needsVerify && (
                  <>
                    {" — "}
                    <Link
                      href={
                        `/register/verify?email=${encodeURIComponent(email.trim().toLowerCase())}` as "/register/verify"
                      }
                      className="font-medium text-[var(--color-primary)] underline"
                    >
                      {t("verifyNotice.title")}
                    </Link>
                  </>
                )}
              </span>
            </div>
          )}

          <Button className="w-full" type="submit" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("login.submit")}
          </Button>

          <p className="text-center text-sm text-[var(--color-muted)]">
            {t("login.noAccount")}{" "}
            <Link href="/register" className="text-[var(--color-primary)]">
              {t("login.register")}
            </Link>
          </p>
        </form>
      </CardBody>
    </Card>
  );
}
