"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useDashboard } from "@/store/dashboard";

export default function DashboardAutoWDrodzePage() {
  const t = useTranslations();
  const { user, cars } = useDashboard();
  const canSell = user.packageId === "pro" || user.packageId === "partner";
  const eligible = cars.filter((c) =>
    ["in_shipping", "delivered"].includes(c.status),
  );
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("dashboard.nav.autoWDrodze")}</h1>
      {!canSell ? (
        <Card>
          <CardBody>
            <Badge variant="warning">Pro required</Badge>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              {t("autoWDrodze.subtitle")}
            </p>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <h2 className="font-semibold">Eligible cars</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {eligible.length === 0 && (
                <li className="text-[var(--color-muted)]">—</li>
              )}
              {eligible.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] p-3"
                >
                  <div>
                    <div className="font-medium">
                      {c.year} {c.make} {c.model}
                    </div>
                    <div className="text-xs text-[var(--color-muted)]">
                      VIN {c.vin}
                    </div>
                  </div>
                  <Button size="sm">Publish</Button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--color-muted)]">
              {t("autoWDrodze.disclaimer")}
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
