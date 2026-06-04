"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useAuth, useCurrentUser } from "@/store/auth";

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
  const tAuth = useTranslations("auth");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const hasHydrated = useAuth((s) => s.hasHydrated);
  const logout = useAuth((s) => s.logout);
  const currentUser = useCurrentUser();
  // Only treat as authed after the persisted store hydrates (avoids SSR mismatch).
  const authed = hasHydrated && !!currentUser;

  // Lock body scroll when mobile menu is open so it acts like a fullscreen drawer
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1a33] text-white">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="BidBIDDERS Academy"
          className="flex items-center gap-2.5"
        >
          <Image
            src="/images/logo-bidbidders-w.png"
            alt="BidBIDDERS Academy"
            width={1279}
            height={220}
            priority
            className="h-[26px] w-auto md:h-11"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className="text-white/75 hover:text-white"
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          {authed ? (
            <>
              <Link href="/dashboard">
                <Button size="sm">
                  <LayoutDashboard className="h-4 w-4" />
                  {t("cabinet")}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                {tAuth("logout")}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  {t("login")}
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="sm">{t("choosePackage")}</Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden fixed left-0 right-0 top-16 bottom-0 z-40 border-t border-white/10 bg-[#0f1a33] text-white overflow-y-auto transition-transform duration-200",
          open ? "translate-y-0" : "-translate-y-[150%] pointer-events-none",
        )}
      >
        <div className="container-page py-6 flex flex-col gap-3">
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
            {authed ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex-1"
                >
                  <Button size="sm" className="w-full">
                    <LayoutDashboard className="h-4 w-4" />
                    {t("cabinet")}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent text-white border-white/25 hover:bg-white/10"
                  onClick={() => {
                    logout();
                    setOpen(false);
                    router.push("/");
                  }}
                >
                  {tAuth("logout")}
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
