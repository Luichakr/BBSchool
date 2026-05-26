"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useDashboard } from "@/store/dashboard";
import { fmt } from "@/lib/format";

export default function CarsPage() {
  const t = useTranslations();
  const { cars } = useDashboard();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-2xl font-bold">{t("dashboard.nav.cars")}</h1>
        <Link href="/dashboard/cars/new">
          <Button>+ {t("common.save")}</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cars.map((c) => (
          <Card key={c.id}>
            <CardBody>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">
                    {c.year} {c.make} {c.model}
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">VIN {c.vin}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {c.source} · {c.location}
                  </p>
                </div>
                <Badge>{c.status}</Badge>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-[var(--color-muted)]">current bid</dt>
                  <dd>${fmt(c.currentBid)}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-muted)]">max bid</dt>
                  <dd>${fmt(c.maxBid)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex gap-2">
                <Link href={`/dashboard/cars/${c.id}` as `/dashboard/cars/${string}`}>
                  <Button size="sm" variant="outline">
                    {t("common.readMore")}
                  </Button>
                </Link>
                <Link href="/dashboard/bid-requests/new">
                  <Button size="sm">{t("cta.submitBidRequest")}</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
