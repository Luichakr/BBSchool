"use client";

import { Card, CardBody } from "@/components/ui/Card";
import { MOCK_BID_REQUESTS, MOCK_PURCHASE, MOCK_AUTO_W_DRODZE } from "@/data/mock";

export default function ManagerOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manager overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">Open bid requests</div>
            <div className="text-2xl font-bold">
              {MOCK_BID_REQUESTS.filter((b) =>
                ["submitted", "manager_review", "need_more_info", "bidding"].includes(
                  b.status,
                ),
              ).length}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">In-progress purchases</div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs text-[var(--color-muted)]">
              VIN {MOCK_PURCHASE.vin}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs text-[var(--color-muted)]">Auto in transit</div>
            <div className="text-2xl font-bold">{MOCK_AUTO_W_DRODZE.length}</div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
