"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Stepper } from "@/components/ui/Stepper";
import { useDashboard } from "@/store/dashboard";
import { fmt } from "@/lib/format";

export default function PurchaseTrackingPage() {
  const t = useTranslations();
  const { purchase, cars } = useDashboard();
  const stepNames = (t.raw as (k: string) => unknown)(
    "purchase.steps",
  ) as string[];
  const stepDetails = (t.raw as (k: string) => unknown)(
    "purchase.stepDetails",
  ) as string[];

  if (!purchase)
    return (
      <Card>
        <CardBody>—</CardBody>
      </Card>
    );

  const car = cars.find((c) => c.id === purchase.carId);

  const steps = purchase.steps.map((s, i) => ({
    title: stepNames[i],
    status: s.status,
    date: s.date,
    note: s.note ?? stepDetails[i],
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("purchase.title")}</h1>
      <Card>
        <CardBody>
          <div className="flex flex-wrap justify-between items-baseline gap-3">
            <div>
              <h2 className="font-semibold">
                {car?.year} {car?.make} {car?.model}
              </h2>
              <p className="text-xs text-[var(--color-muted)]">VIN {purchase.vin}</p>
            </div>
            <Badge variant="primary">
              {purchase.currentStep + 1}/{steps.length}
            </Badge>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardBody>
            <Stepper steps={steps} />
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardBody>
              <h3 className="font-semibold">Documents</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {purchase.documents.map((d) => (
                  <li
                    key={d.id}
                    className="flex justify-between rounded-lg bg-gray-50 p-2.5"
                  >
                    <span>{d.name}</span>
                    <span className="text-[var(--color-muted)] text-xs">
                      {d.uploadedAt}
                    </span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 className="font-semibold">Payments</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {purchase.payments.map((p) => (
                  <li
                    key={p.id}
                    className="flex justify-between rounded-lg bg-gray-50 p-2.5"
                  >
                    <span>{p.label}</span>
                    <span>
                      {fmt(p.amount)} {p.currency}{" "}
                      <Badge variant={p.status === "paid" ? "success" : "warning"}>
                        {p.status}
                      </Badge>
                    </span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
