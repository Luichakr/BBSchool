"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useDashboard } from "@/store/dashboard";
import { fmt } from "@/lib/format";

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ carId: string }>;
}) {
  const { carId } = use(params);
  const t = useTranslations();
  const car = useDashboard((s) => s.cars.find((c) => c.id === carId));
  if (!car)
    return (
      <Card>
        <CardBody>Car not found.</CardBody>
      </Card>
    );

  return (
    <div className="space-y-6">
      <Link href="/dashboard/cars" className="text-sm text-[var(--color-primary)]">
        ← {t("common.back")}
      </Link>
      <Card>
        <CardBody>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">
                {car.year} {car.make} {car.model}
              </h1>
              <p className="text-sm text-[var(--color-muted)]">VIN {car.vin}</p>
            </div>
            <Badge>{car.status}</Badge>
          </div>
          <dl className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-[var(--color-muted)]">Source</dt>
              <dd>{car.source}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">Location</dt>
              <dd>{car.location ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">Current bid</dt>
              <dd>${fmt(car.currentBid)}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">Max bid</dt>
              <dd>${fmt(car.maxBid)}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">Auction</dt>
              <dd>
                {car.auctionUrl ? (
                  <a
                    href={car.auctionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] underline"
                  >
                    open
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard/calculator">
              <Button variant="outline">{t("dashboard.nav.calculator")}</Button>
            </Link>
            <Link href="/dashboard/bid-requests/new">
              <Button>{t("cta.submitBidRequest")}</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
