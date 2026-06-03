import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { CONTACTS } from "@/data/contacts";
import {
  Mail,
  Send,
  MapPin,
  Phone,
  GraduationCap,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const productLinks = [
    { href: "/course", label: t("nav.course") },
    { href: "/what-inside", label: t("nav.whatInside") },
    { href: "/calculator", label: t("calculatorPage.kicker") },
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/basic", label: t("nav.basic") },
    { href: "/pro", label: t("nav.pro") },
    { href: "/partner", label: t("nav.partner") },
  ];

  const companyLinks = [
    { href: "/how-it-works", label: t("nav.howItWorks") },
    { href: "/car-auctions", label: t("nav.auctions") },
    { href: "/about", label: t("nav.about") },
    { href: "/auto-w-drodze", label: t("nav.autoWDrodze") },
    { href: "/bidders-power", label: t("nav.biddersPower") },
    { href: "/faq", label: t("nav.faq") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="bg-[#0b1428] text-white">
      <div className="container-page pt-14 pb-10">
        {/* TOP CTA banner card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101d3b] px-5 md:px-7 py-4 md:py-5">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 shadow-[0_0_20px_-5px_rgba(255,92,0,0.4)]">
                <GraduationCap className="h-5 w-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold leading-tight">
                  {t("footer.cta.title")}
                </h2>
                <p className="mt-1 text-xs md:text-sm text-white/65">
                  {t("footer.cta.subtitle")}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <Link href="/pricing">
                <Button size="md" variant="accent">
                  {t("footer.cta.primary")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="md"
                  variant="outline"
                  className="bg-transparent text-white border-white/25 hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t("footer.cta.secondary")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="BidBIDDERS Academy"
              className="inline-flex items-center"
            >
              <Image
                src="/images/logo-bidbidders-w.png"
                alt="BidBIDDERS Academy"
                width={1279}
                height={220}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-white/65 max-w-xs leading-relaxed">
              {t("footer.tagline")}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={CONTACTS.bidbidders.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white/80 hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Send className="h-4 w-4 text-[var(--color-primary)]" />
                  </span>
                  {CONTACTS.bidbidders.telegramLabel}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACTS.bidbidders.email}`}
                  className="inline-flex items-center gap-3 text-white/80 hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Mail className="h-4 w-4 text-[var(--color-primary)]" />
                  </span>
                  {CONTACTS.bidbidders.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-5">
              <span className="h-4 w-1 rounded-full bg-[var(--color-primary)]" />
              {t("footer.product")}
            </h4>
            <ul className="space-y-3 text-sm">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href as `/${string}`}
                    className="group inline-flex items-center justify-between gap-2 text-white/80 hover:text-white w-full"
                  >
                    <span>{l.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-white/30 group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-5">
              <span className="h-4 w-1 rounded-full bg-[var(--color-primary)]" />
              {t("footer.company")}
            </h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href as `/${string}`}
                    className="group inline-flex items-center justify-between gap-2 text-white/80 hover:text-white w-full"
                  >
                    <span>{l.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-white/30 group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-5">
              <span className="h-4 w-1 rounded-full bg-[var(--color-primary)]" />
              {t("footer.contacts")}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                </span>
                <span className="text-white/85 leading-relaxed">
                  <span className="block font-medium">
                    {CONTACTS.carAuctionsPoland.name}
                  </span>
                  <span className="block text-white/65 mt-0.5">
                    {CONTACTS.carAuctionsPoland.addressLine1}
                  </span>
                  <span className="block text-white/65">
                    {CONTACTS.carAuctionsPoland.addressLine2}
                  </span>
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACTS.carAuctionsPoland.email}`}
                  className="flex items-center gap-3 text-white/85 hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Mail className="h-4 w-4 text-[var(--color-primary)]" />
                  </span>
                  {CONTACTS.carAuctionsPoland.email}
                </a>
              </li>
              {CONTACTS.carAuctionsPoland.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-white/85 hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Phone className="h-4 w-4 text-[var(--color-primary)]" />
                    </span>
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-3 text-xs text-white/55 shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
              <ShieldCheck className="h-4 w-4 text-[var(--color-primary)]" />
            </span>
            <span>
              © {year} BidBIDDERS Academy. {t("footer.rights")}
            </span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/65 lg:flex-1 lg:justify-center">
            <li>
              <Link href="/legal/terms" className="hover:text-white">
                {t("legal.terms")}
              </Link>
            </li>
            <li className="text-white/15">|</li>
            <li>
              <Link href="/legal/privacy" className="hover:text-white">
                {t("legal.privacy")}
              </Link>
            </li>
            <li className="text-white/15">|</li>
            <li>
              <Link href="/legal/risk-disclaimer" className="hover:text-white">
                {t("legal.risk")}
              </Link>
            </li>
            <li className="text-white/15">|</li>
            <li>
              <Link href="/risk" className="hover:text-white">
                {t("risk.title")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="container-page pb-6">
          <p className="text-[11px] leading-relaxed text-white/40 max-w-4xl">
            {t("legal.disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
