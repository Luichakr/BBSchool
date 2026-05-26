"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useDashboard } from "@/store/dashboard";
import { fmt } from "@/lib/format";

export default function BidRequestsPage() {
  const t = useTranslations();
  const { bidRequests, cars } = useDashboard();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-2xl font-bold">{t("dashboard.nav.bidRequests")}</h1>
        <Link href="/dashboard/bid-requests/new">
          <Button>+ {t("cta.submitBidRequest")}</Button>
        </Link>
      </div>
      <Card>
        <CardBody className="!p-0">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left">
                <th className="p-3">Car</th>
                <th className="p-3">Max bid</th>
                <th className="p-3">Status</th>
                <th className="p-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {bidRequests.map((b) => {
                const car = cars.find((c) => c.id === b.carId);
                return (
                  <tr
                    key={b.id}
                    className="border-b border-[var(--color-border)] last:border-none"
                  >
                    <td className="p-3 font-medium">
                      {car?.year} {car?.make} {car?.model}
                    </td>
                    <td className="p-3">${fmt(b.maxBid)}</td>
                    <td className="p-3">
                      <Badge>{t(`bidRequest.statuses.${b.status}`)}</Badge>
                    </td>
                    <td className="p-3 text-[var(--color-muted)]">{b.updatedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
