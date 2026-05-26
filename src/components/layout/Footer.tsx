import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACTS } from "@/data/contacts";
import { Mail, Send, MapPin, Phone } from "lucide-react";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="container-page py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="rounded-md bg-[var(--color-dark)] px-2 py-1 text-xs text-white">
              BB
            </span>
            BidBIDDERS School
          </Link>
          <p className="mt-3 text-sm text-[var(--color-muted)] max-w-xs">
            {t("footer.tagline")}
          </p>
          <ul className="mt-5 space-y-1.5 text-sm">
            <li>
              <a
                href={CONTACTS.bidbidders.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--color-primary)]"
              >
                <Send className="h-4 w-4" /> {CONTACTS.bidbidders.telegramLabel}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACTS.bidbidders.email}`}
                className="inline-flex items-center gap-2 hover:text-[var(--color-primary)]"
              >
                <Mail className="h-4 w-4" /> {CONTACTS.bidbidders.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">{t("footer.product")}</h4>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li><Link href="/course">{t("nav.course")}</Link></li>
            <li><Link href="/what-inside">{t("nav.whatInside")}</Link></li>
            <li><Link href="/calculator">{t("calculatorPage.kicker")}</Link></li>
            <li><Link href="/pricing">{t("nav.pricing")}</Link></li>
            <li><Link href="/basic">{t("nav.basic")}</Link></li>
            <li><Link href="/pro">{t("nav.pro")}</Link></li>
            <li><Link href="/concierge">{t("nav.concierge")}</Link></li>
            <li><Link href="/partner">{t("nav.partner")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li><Link href="/how-it-works">{t("nav.howItWorks")}</Link></li>
            <li><Link href="/car-auctions">{t("nav.auctions")}</Link></li>
            <li><Link href="/about">{t("nav.about")}</Link></li>
            <li><Link href="/auto-w-drodze">{t("nav.autoWDrodze")}</Link></li>
            <li><Link href="/bidders-power">{t("nav.biddersPower")}</Link></li>
            <li><Link href="/faq">{t("nav.faq")}</Link></li>
            <li><Link href="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">
            {CONTACTS.carAuctionsPoland.name}
          </h4>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                {CONTACTS.carAuctionsPoland.addressLine1},{" "}
                {CONTACTS.carAuctionsPoland.addressLine2}
              </span>
            </li>
            <li>
              <a
                href={`mailto:${CONTACTS.carAuctionsPoland.email}`}
                className="inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                {CONTACTS.carAuctionsPoland.email}
              </a>
            </li>
            {CONTACTS.carAuctionsPoland.phones.map((p) => (
              <li key={p}>
                <a
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {p}
                </a>
              </li>
            ))}
          </ul>
          <h4 className="mt-6 font-semibold text-sm mb-3">
            {t("footer.legal")}
          </h4>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li><Link href="/legal/terms">{t("legal.terms")}</Link></li>
            <li><Link href="/legal/privacy">{t("legal.privacy")}</Link></li>
            <li><Link href="/legal/risk-disclaimer">{t("legal.risk")}</Link></li>
            <li><Link href="/risk">{t("risk.title")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)]">
        <div className="container-page py-5 text-xs text-[var(--color-muted)] flex flex-wrap items-center justify-between gap-3">
          <div>© {year} BidBIDDERS School. {t("footer.rights")}</div>
          <div className="max-w-xl text-right">{t("legal.disclaimer")}</div>
        </div>
      </div>
    </footer>
  );
}
