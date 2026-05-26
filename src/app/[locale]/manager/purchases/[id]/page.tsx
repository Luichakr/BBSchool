"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { MOCK_PURCHASE } from "@/data/mock";

export default function ManagerPurchaseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const t = useTranslations();
  const purchase = MOCK_PURCHASE.id === id ? MOCK_PURCHASE : null;
  const stepNames = (t.raw as (k: string) => unknown)("purchase.steps") as string[];
  if (!purchase) return <Card><CardBody>Not found.</CardBody></Card>;
  const steps = purchase.steps.map((s, i) => ({
    title: stepNames[i],
    status: s.status,
    date: s.date,
  }));
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Purchase {purchase.id}</h1>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardBody>
            <Stepper steps={steps} />
          </CardBody>
        </Card>
        <Card>
          <CardBody className="space-y-2">
            <h2 className="font-semibold">Actions</h2>
            <Button size="sm" className="w-full">Advance step</Button>
            <Button size="sm" variant="outline" className="w-full">Add document</Button>
            <Button size="sm" variant="outline" className="w-full">Add photo</Button>
            <Button size="sm" variant="outline" className="w-full">Notify client</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
