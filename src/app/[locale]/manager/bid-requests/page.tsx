"use client";

import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import { MOCK_BID_REQUESTS, MOCK_CARS } from "@/data/mock";
import { fmt } from "@/lib/format";

export default function ManagerBidRequests() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bid requests</h1>
      <Card>
        <CardBody className="!p-0">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left">
                <th className="p-3">Client</th>
                <th className="p-3">Car</th>
                <th className="p-3">VIN</th>
                <th className="p-3">Max bid</th>
                <th className="p-3">Status</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {MOCK_BID_REQUESTS.map((b) => {
                const car = MOCK_CARS.find((c) => c.id === b.carId);
                return (
                  <tr key={b.id} className="border-b border-[var(--color-border)] last:border-none">
                    <td className="p-3">Adam Nowak</td>
                    <td className="p-3">{car?.year} {car?.make} {car?.model}</td>
                    <td className="p-3 font-mono text-xs">{car?.vin}</td>
                    <td className="p-3">${fmt(b.maxBid)}</td>
                    <td className="p-3"><Badge>{b.status}</Badge></td>
                    <td className="p-3">
                      <Link href={`/manager/bid-requests/${b.id}` as `/manager/bid-requests/${string}`} className="text-[var(--color-primary)]">
                        Open
                      </Link>
                    </td>
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
