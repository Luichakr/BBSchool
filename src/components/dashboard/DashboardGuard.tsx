"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/store/auth";

/**
 * Client-side gate for the demo cabinet. Redirects to /login when there is no
 * authenticated, email-verified user. Waits for the persisted store to hydrate
 * to avoid a flash/false redirect on first paint.
 */
export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const hasHydrated = useAuth((s) => s.hasHydrated);
  const currentUserId = useAuth((s) => s.currentUserId);
  const users = useAuth((s) => s.users);
  const authed = !!users.find((u) => u.id === currentUserId && u.verified);

  useEffect(() => {
    if (hasHydrated && !authed) router.replace("/login");
  }, [hasHydrated, authed, router]);

  if (!hasHydrated || !authed) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <div className="flex items-center gap-3 text-[var(--color-muted)]">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--color-primary)]" />
          {t("guard.checking")}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
