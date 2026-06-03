"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { useDashboard } from "@/store/dashboard";
import { useCurrentUser } from "@/store/auth";
import { getPackage } from "@/data/packages";
import { COURSE } from "@/data/course";
import { fmt } from "@/lib/format";

export default function DashboardHome() {
  const t = useTranslations();
  const { user, cars, bidRequests, purchase, power, completedLessonIds } = useDashboard();
  const authUser = useCurrentUser();
  const displayName = (authUser?.name || user.name).split(" ")[0];
  const pkg = getPackage(user.packageId ?? "basic");
  const totalLessons = COURSE.reduce((s, m) => s + m.lessons.length, 0);
  const progress = Math.round((completedLessonIds.size / totalLessons) * 100);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-2xl font-bold">
          {t("dashboard.home.welcome")}, {displayName}
        </h1>
        <Badge variant="primary">
          {t("dashboard.home.currentPackage")}: {t(`packages.${user.packageId}.name`)}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">
              {t("dashboard.home.courseProgress")}
            </div>
            <div className="mt-1 text-2xl font-bold">{progress}%</div>
            <Progress value={progress} className="mt-2" />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">
              {t("dashboard.home.availableRequests")}
            </div>
            <div className="mt-1 text-2xl font-bold">
              {pkg?.bidRequestLimit
                ? Math.max(0, pkg.bidRequestLimit - user.usedBidRequests)
                : "∞"}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">
              {t("dashboard.home.savedCars")}
            </div>
            <div className="mt-1 text-2xl font-bold">{cars.length}</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">
              {t("biddersPower.title")}
            </div>
            <div className="mt-1 text-2xl font-bold">{power.powerBalance}/5</div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardBody>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-semibold">{t("dashboard.home.activeRequests")}</h2>
              <Link href="/dashboard/bid-requests" className="text-sm text-[var(--color-primary)]">
                {t("common.all")}
              </Link>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {bidRequests.slice(0, 3).map((b) => {
                const car = cars.find((c) => c.id === b.carId);
                return (
                  <li
                    key={b.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] p-3"
                  >
                    <div>
                      <div className="font-medium">
                        {car?.year} {car?.make} {car?.model}
                      </div>
                      <div className="text-xs text-[var(--color-muted)]">
                        max ${fmt(b.maxBid)}
                      </div>
                    </div>
                    <Badge>{t(`bidRequest.statuses.${b.status}`)}</Badge>
                  </li>
                );
              })}
              {bidRequests.length === 0 && (
                <li className="text-[var(--color-muted)]">—</li>
              )}
            </ul>
            <div className="mt-5">
              <Link href="/dashboard/bid-requests/new">
                <Button>{t("dashboard.home.newBidRequest")}</Button>
              </Link>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="font-semibold">{t("dashboard.home.currentPurchase")}</h2>
            {purchase ? (
              <>
                <div className="mt-3 text-sm">
                  <div className="font-medium">VIN {purchase.vin}</div>
                  <div className="text-[var(--color-muted)]">
                    {t("purchase.title")}
                  </div>
                </div>
                <Progress
                  value={(purchase.currentStep + 1) * (100 / 16)}
                  className="mt-3"
                />
                <Link
                  href="/dashboard/purchase-tracking"
                  className="mt-4 inline-block text-sm text-[var(--color-primary)]"
                >
                  {t("common.readMore")}
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm text-[var(--color-muted)]">—</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
