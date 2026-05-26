"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDashboard } from "@/store/dashboard";

export default function ProfilePage() {
  const t = useTranslations();
  const { user } = useDashboard();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("dashboard.nav.profile")}</h1>
      <Card>
        <CardBody>
          <form className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="pf-name">{t("common.name")}</Label>
              <Input id="pf-name" defaultValue={user.name} />
            </div>
            <div>
              <Label htmlFor="pf-email">{t("common.email")}</Label>
              <Input id="pf-email" defaultValue={user.email} />
            </div>
            <div>
              <Label htmlFor="pf-phone">{t("common.phone")}</Label>
              <Input id="pf-phone" defaultValue={user.phone} />
            </div>
            <div className="md:col-span-2">
              <Button type="button">{t("common.save")}</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
