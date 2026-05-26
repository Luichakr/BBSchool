"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const NAV = [
  { key: "course", href: "/course" },
  { key: "whatInside", href: "/what-inside" },
  { key: "pricing", href: "/pricing" },
  { key: "auctions", href: "/car-auctions" },
  { key: "howItWorks", href: "/how-it-works" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="rounded-md bg-[var(--color-dark)] px-2 py-1 text-xs text-white">
            BB
          </span>
          <span className="hidden sm:inline">BidBIDDERS School</span>
          <span className="sm:hidden">BB School</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)]"
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              {t("login")}
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="sm">{t("choosePackage")}</Button>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-[var(--color-border)] bg-white transition-[max-height]",
          open ? "max-h-screen" : "max-h-0",
        )}
      >
        <div className="container-page py-4 flex flex-col gap-3">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm"
            >
              {t(n.key)}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <LanguageSwitcher />
            <Link href="/login" onClick={() => setOpen(false)} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                {t("login")}
              </Button>
            </Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="flex-1">
              <Button size="sm" className="w-full">
                {t("choosePackage")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
