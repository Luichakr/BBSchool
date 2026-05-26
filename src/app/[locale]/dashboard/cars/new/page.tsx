"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDashboard } from "@/store/dashboard";
import type { ClientCar } from "@/types";

export default function NewCarPage() {
  const t = useTranslations();
  const router = useRouter();
  const addCar = useDashboard((s) => s.addCar);
  const [form, setForm] = useState({
    vin: "",
    make: "",
    model: "",
    year: 2020,
    auctionUrl: "",
    location: "",
    currentBid: 0,
    maxBid: 0,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">+ Car</h1>
      <Card>
        <CardBody>
          <form
            className="grid gap-3 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const car: ClientCar = {
                id: `car_${Date.now()}`,
                userId: "u_demo",
                vin: form.vin,
                make: form.make,
                model: form.model,
                year: Number(form.year),
                source: "copart",
                auctionUrl: form.auctionUrl || undefined,
                location: form.location || undefined,
                currentBid: Number(form.currentBid) || undefined,
                maxBid: Number(form.maxBid) || undefined,
                images: [],
                status: "saved",
              };
              addCar(car);
              router.push("/dashboard/cars");
            }}
          >
            <div className="md:col-span-2">
              <Label htmlFor="vin">VIN</Label>
              <Input
                id="vin"
                required
                minLength={11}
                value={form.vin}
                onChange={(e) => setForm({ ...form, vin: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                required
                value={form.make}
                onChange={(e) => setForm({ ...form, make: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                required
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="auctionUrl">Auction link</Label>
              <Input
                id="auctionUrl"
                value={form.auctionUrl}
                onChange={(e) => setForm({ ...form, auctionUrl: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="currentBid">Current bid (USD)</Label>
              <Input
                id="currentBid"
                type="number"
                value={form.currentBid}
                onChange={(e) => setForm({ ...form, currentBid: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="maxBid">Max bid (USD)</Label>
              <Input
                id="maxBid"
                type="number"
                value={form.maxBid}
                onChange={(e) => setForm({ ...form, maxBid: Number(e.target.value) })}
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full md:w-auto">
                {t("common.save")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
