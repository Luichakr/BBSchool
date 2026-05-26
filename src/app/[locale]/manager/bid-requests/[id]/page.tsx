"use client";

import { use } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_BID_REQUESTS, MOCK_CARS } from "@/data/mock";
import { fmt } from "@/lib/format";

export default function ManagerBidRequestDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const req = MOCK_BID_REQUESTS.find((r) => r.id === id);
  if (!req) return <Card><CardBody>Not found.</CardBody></Card>;
  const car = MOCK_CARS.find((c) => c.id === req.carId);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bid request {req.id}</h1>
      <Card>
        <CardBody className="space-y-2 text-sm">
          <div>
            Client: <strong>Adam Nowak</strong>
          </div>
          <div>
            Car: {car?.year} {car?.make} {car?.model} · VIN {car?.vin}
          </div>
          <div>Max bid: ${fmt(req.maxBid)}</div>
          <div>Status: <Badge>{req.status}</Badge></div>
          {req.comment && (
            <div className="rounded-lg bg-gray-50 p-3 mt-3">{req.comment}</div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm">Approve</Button>
            <Button size="sm" variant="outline">Need more info</Button>
            <Button size="sm" variant="outline">Reject</Button>
            <Button size="sm" variant="dark">Mark bidding</Button>
            <Button size="sm" variant="accent">Mark won</Button>
            <Button size="sm" variant="ghost">Mark lost</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
