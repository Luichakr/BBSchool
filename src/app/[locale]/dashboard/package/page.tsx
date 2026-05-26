"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { useDashboard } from "@/store/dashboard";
import { getPackage } from "@/data/packages";

export default function PackagePage() {
  const t = useTranslations();
  const { user } = useDashboard();
  const pkg = getPackage(user.packageId ?? "basic");
  const includes = (t.raw as (k: string) => unknown)(
    `packages.${user.packageId}.includes`,
  ) as string[];

  const expiresLabel = user.packageExpiresAt ?? "—";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("dashboard.nav.package")}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">Package</div>
            <div className="mt-1 text-xl font-bold">
              {t(`packages.${user.packageId}.name`)}
            </div>
            <Badge className="mt-2">{user.packageId}</Badge>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">Expires</div>
            <div className="mt-1 text-xl font-bold">{expiresLabel}</div>
            <div className="text-xs text-[var(--color-muted)] mt-1">
              {user.packageStartedAt} → {user.packageExpiresAt ?? "—"}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">Successful purchases</div>
            <div className="mt-1 text-xl font-bold">
              {user.successfulPurchases}/{pkg?.includedSuccessfulPurchases ?? "∞"}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody>
          <h2 className="font-semibold">{t("common.all")}</h2>
          <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
            {includes.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
          <div className="mt-5">
            <Link href="/dashboard/upgrade">
              <Button>{t("dashboard.home.upgradeNow")}</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
