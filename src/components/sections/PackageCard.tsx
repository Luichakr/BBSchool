import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle } from "lucide-react";
import type { PackageId } from "@/types";

const DETAIL_HREF: Record<PackageId, "/basic" | "/pro" | "/partner"> = {
  basic: "/basic",
  pro: "/pro",
  partner: "/partner",
};

const CTA_KEY: Record<PackageId, string> = {
  basic: "cta.buyBasic",
  pro: "cta.buyPro",
  partner: "cta.applyPartner",
};

export function PackageCard({
  id,
  highlight,
}: {
  id: PackageId;
  highlight?: boolean;
}) {
  const t = useTranslations();
  const includes = (t.raw as (k: string) => unknown)(
    `packages.${id}.includes`,
  ) as string[];
  const restrictions = (t.raw as (k: string) => unknown)(
    `packages.${id}.restrictions`,
  ) as string[];

  const primaryHref =
    id === "partner"
      ? "/partner"
      : (`/checkout?package=${id}` as `/checkout?package=${PackageId}`);

  return (
    <Card
      className={`flex h-full flex-col ${highlight ? "border-[var(--color-primary)] shadow-md" : ""}`}
    >
      <CardBody className="flex h-full flex-col">
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-bold">{t(`packages.${id}.name`)}</h3>
          {highlight && <Badge variant="primary">★</Badge>}
        </div>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          {t(`packages.${id}.for`)}
        </p>
        <div className="mt-5">
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold">{t(`packages.${id}.price`)}</div>
            <div className="text-xs font-medium text-[var(--color-muted)]">
              {t("vatLabels.brutto")}
            </div>
          </div>
          {/* Net + VAT breakdown — required by Polish consumer law */}
          <div className="mt-1 text-xs text-[var(--color-muted)]">
            {t(`packages.${id}.priceNet`)} · {t(`packages.${id}.priceVat`)} (
            {t("vatLabels.vat")})
          </div>
          <div className="mt-1 text-xs text-[var(--color-muted)]">
            {t(`packages.${id}.priceNote`)}
          </div>
          {/* P24 requirement: total cost incl. delivery + service-delivery time
              must be visible before placing an order. */}
          <div className="mt-2 space-y-0.5 text-[11px] text-[var(--color-muted)]">
            <div>
              {t("checkout.summary.deliveryLabel")}:{" "}
              <span className="text-[var(--color-text)]">
                {t("checkout.summary.deliveryValue")}
              </span>
            </div>
            <div>
              {t("checkout.summary.terminLabel")}:{" "}
              <span className="text-[var(--color-text)]">
                {t("checkout.summary.terminValue")}
              </span>
            </div>
          </div>
        </div>

        {/* flex-1 wrapper pushes the CTAs to a consistent bottom edge across all cards */}
        <div className="flex-1">
          <ul className="mt-5 space-y-2 text-sm">
            {includes.map((it, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-2 text-sm">
            {restrictions.map((it, i) => (
              <li key={i} className="flex gap-2 text-[var(--color-muted)]">
                <XCircle className="h-4 w-4 text-[var(--color-muted)] mt-0.5 shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 space-y-2">
          <Link href={primaryHref}>
            <Button variant="primary" className="w-full">
              {t(CTA_KEY[id])}
            </Button>
          </Link>
          <Link href={DETAIL_HREF[id]}>
            <Button variant="ghost" className="w-full">
              {t("common.learnMore")}
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
