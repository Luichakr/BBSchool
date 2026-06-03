"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAuth, useCurrentUser } from "@/store/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const register = useAuth((s) => s.register);
  const hasHydrated = useAuth((s) => s.hasHydrated);
  const currentUser = useCurrentUser();

  // Already logged in → straight to the cabinet.
  useEffect(() => {
    if (hasHydrated && currentUser) router.replace("/dashboard");
  }, [hasHydrated, currentUser, router]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError(t("errors.nameRequired"));
    if (!EMAIL_RE.test(email)) return setError(t("errors.emailInvalid"));
    if (password.length < 8) return setError(t("errors.passwordShort"));
    if (password !== confirm) return setError(t("errors.passwordMismatch"));

    setLoading(true);
    const res = register({ name, email, password });
    if (!res.ok) {
      setLoading(false);
      return setError(t(`errors.${res.error}`));
    }
    router.push(
      `/register/verify?email=${encodeURIComponent(email.trim().toLowerCase())}` as "/register/verify",
    );
  };

  return (
    <Card className="mt-6">
      <CardBody>
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div>
            <Label htmlFor="r-name">{t("register.name")}</Label>
            <Input
              id="r-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div>
            <Label htmlFor="r-email">{t("register.email")}</Label>
            <Input
              id="r-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="r-pass">{t("register.password")}</Label>
            <Input
              id="r-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              {t("register.passwordHint")}
            </p>
          </div>
          <div>
            <Label htmlFor="r-confirm">{t("register.confirm")}</Label>
            <Input
              id="r-confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-[var(--color-danger)]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <Button className="w-full" type="submit" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("register.submit")}
          </Button>

          <p className="text-center text-sm text-[var(--color-muted)]">
            {t("register.haveAccount")}{" "}
            <Link href="/login" className="text-[var(--color-primary)]">
              {t("register.login")}
            </Link>
          </p>
          <p className="text-xs text-[var(--color-muted)]">{t("register.agree")}</p>
        </form>
      </CardBody>
    </Card>
  );
}
