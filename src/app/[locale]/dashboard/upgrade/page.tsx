"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { PackageCard } from "@/components/sections/PackageCard";

export default function UpgradePage() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("dashboard.nav.upgrade")}</h1>
      <Container className="!px-0 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PackageCard id="basic" />
        <PackageCard id="pro" highlight />
        <PackageCard id="concierge" />
        <PackageCard id="partner" />
      </Container>
    </div>
  );
}
