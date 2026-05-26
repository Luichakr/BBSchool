"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDashboard } from "@/store/dashboard";
import type { BidRequest } from "@/types";

export default function NewBidRequestPage() {
  const t = useTranslations();
  const router = useRouter();
  const { cars, addBidRequest } = useDashboard();
  const riskItems = (t.raw as (k: string) => unknown)(
    "bidRequest.risk.items",
  ) as string[];

  const [carId, setCarId] = useState(cars[0]?.id ?? "");
  const [maxBid, setMaxBid] = useState(cars[0]?.maxBid ?? 0);
  const [comment, setComment] = useState("");
  const [checks, setChecks] = useState<boolean[]>(riskItems.map(() => false));
  const allChecked = checks.every(Boolean);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("bidRequest.title")}</h1>
      <Card>
        <CardBody>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!allChecked || !carId) return;
              const req: BidRequest = {
                id: `br_${Date.now()}`,
                userId: "u_demo",
                carId,
                maxBid: Number(maxBid),
                currency: "USD",
                status: "submitted",
                riskAccepted: true,
                paymentReadinessAccepted: true,
                comment,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              addBidRequest(req);
              router.push("/dashboard/bid-requests");
            }}
          >
            <div>
              <Label htmlFor="br-car">{t("bidRequest.fields.car")}</Label>
              <select
                id="br-car"
                className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm"
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
              >
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.year} {c.make} {c.model} · VIN {c.vin}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="br-max">{t("bidRequest.fields.maxBid")}</Label>
              <Input
                id="br-max"
                type="number"
                value={maxBid}
                onChange={(e) => setMaxBid(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="br-comment">{t("bidRequest.fields.comment")}</Label>
              <Textarea
                id="br-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold">{t("bidRequest.risk.title")}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {riskItems.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <input
                      id={`br-c-${i}`}
                      type="checkbox"
                      checked={checks[i]}
                      onChange={(e) =>
                        setChecks((p) =>
                          p.map((v, j) => (j === i ? e.target.checked : v)),
                        )
                      }
                      className="mt-1"
                    />
                    <label htmlFor={`br-c-${i}`}>{it}</label>
                  </li>
                ))}
              </ul>
            </div>
            <Button type="submit" disabled={!allChecked} className="w-full md:w-auto">
              {t("cta.submitBidRequest")}
            </Button>
            <p className="text-xs text-[var(--color-muted)]">
              {t("legal.disclaimer")}
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
