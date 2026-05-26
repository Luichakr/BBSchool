"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SupportPage() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("dashboard.nav.support")}</h1>
      <Card>
        <CardBody>
          <form className="space-y-3">
            <div>
              <Label htmlFor="s-subject">Subject</Label>
              <Input id="s-subject" required />
            </div>
            <div>
              <Label htmlFor="s-msg">{t("common.message")}</Label>
              <Textarea id="s-msg" required />
            </div>
            <Button type="button">{t("common.send")}</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
