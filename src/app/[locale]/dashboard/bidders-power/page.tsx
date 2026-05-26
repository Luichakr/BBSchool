"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { useDashboard } from "@/store/dashboard";

export default function DashboardBiddersPowerPage() {
  const t = useTranslations();
  const { power } = useDashboard();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("biddersPower.title")}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">
              Your referral link
            </div>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm overflow-x-auto">
                {power.referralLink}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (typeof navigator !== "undefined") {
                    navigator.clipboard?.writeText(power.referralLink);
                  }
                }}
              >
                Copy
              </Button>
            </div>
            <div className="mt-5 text-sm text-[var(--color-muted)]">
              {power.powerBalance}/5 Power
            </div>
            <Progress value={(power.powerBalance / 5) * 100} className="mt-2" />
            <div className="mt-3 text-sm">
              {t("biddersPower.tiers.0.discount")} →{" "}
              <strong>{power.availableDiscountPln} PLN</strong>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2 className="font-semibold">Referrals</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {power.referrals.map((r) => (
                <li
                  key={r.id}
                  className="flex justify-between rounded-lg bg-gray-50 p-2.5"
                >
                  <span>{r.name ?? r.email ?? "—"}</span>
                  <Badge
                    variant={
                      r.status === "paid" || r.status === "bonus_available"
                        ? "success"
                        : r.status === "invited"
                          ? "neutral"
                          : "warning"
                    }
                  >
                    {r.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
