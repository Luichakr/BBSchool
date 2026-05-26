"use client";

import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MOCK_AUTO_W_DRODZE } from "@/data/mock";
import { fmt } from "@/lib/format";

export default function ManagerAutoWDrodze() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Auto in transit</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {MOCK_AUTO_W_DRODZE.map((c) => (
          <Card key={c.id}>
            <CardBody>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{c.year} {c.make} {c.model}</h3>
                  <p className="text-xs text-[var(--color-muted)]">{c.vinMasked}</p>
                </div>
                <Badge>{c.publishedBy}</Badge>
              </div>
              <div className="mt-3 text-sm">${fmt(c.priceUsd)} · ETA {c.etaDays} d</div>
              <div className="mt-3 flex gap-2">
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="outline">Reserve</Button>
                <Button size="sm" variant="ghost">Mark sold</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
