"use client";

import { Card, CardBody } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { MOCK_PURCHASE } from "@/data/mock";

export default function ManagerPurchases() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Purchases</h1>
      <Card>
        <CardBody>
          <Link
            href={`/manager/purchases/${MOCK_PURCHASE.id}` as `/manager/purchases/${string}`}
            className="text-[var(--color-primary)]"
          >
            VIN {MOCK_PURCHASE.vin} · step {MOCK_PURCHASE.currentStep + 1}/16
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
