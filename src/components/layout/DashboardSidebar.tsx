"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  Home,
  GraduationCap,
  Package,
  Car,
  Calculator,
  Gavel,
  Truck,
  Globe,
  Sparkles,
  ArrowUp,
  User,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useAuth, useCurrentUser } from "@/store/auth";

const ITEMS = [
  { key: "home", href: "/dashboard", Icon: Home },
  { key: "course", href: "/dashboard/course", Icon: GraduationCap },
  { key: "package", href: "/dashboard/package", Icon: Package },
  { key: "cars", href: "/dashboard/cars", Icon: Car },
  { key: "calculator", href: "/dashboard/calculator", Icon: Calculator },
  { key: "bidRequests", href: "/dashboard/bid-requests", Icon: Gavel },
  { key: "purchaseTracking", href: "/dashboard/purchase-tracking", Icon: Truck },
  { key: "autoWDrodze", href: "/dashboard/auto-w-drodze", Icon: Globe },
  { key: "biddersPower", href: "/dashboard/bidders-power", Icon: Sparkles },
  { key: "upgrade", href: "/dashboard/upgrade", Icon: ArrowUp },
  { key: "profile", href: "/dashboard/profile", Icon: User },
  { key: "support", href: "/dashboard/support", Icon: LifeBuoy },
] as const;

export function DashboardSidebar() {
  const t = useTranslations("dashboard.nav");
  const tAuth = useTranslations("auth");
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuth((s) => s.logout);
  const user = useCurrentUser();

  const onLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <>
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-[var(--color-border)] bg-white">
        <nav className="p-3 sticky top-16">
          {user && (
            <div className="mb-3 rounded-lg bg-[var(--color-bg)] px-3 py-2.5">
              <div className="truncate text-sm font-semibold">{user.name}</div>
              <div className="truncate text-xs text-[var(--color-muted)]">
                {user.email}
              </div>
            </div>
          )}
          <ul className="space-y-0.5">
            {ITEMS.map(({ key, href, Icon }) => {
              const active = pathname === href || pathname?.startsWith(href + "/");
              return (
                <li key={key}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm",
                      active
                        ? "bg-[var(--color-primary)] text-white"
                        : "text-[var(--color-muted)] hover:bg-gray-50 hover:text-[var(--color-text)]",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t(key)}
                  </Link>
                </li>
              );
            })}
            <li className="pt-1">
              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--color-muted)] hover:bg-gray-50 hover:text-[var(--color-text)]"
              >
                <LogOut className="h-4 w-4" />
                {tAuth("logout")}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-[var(--color-border)] bg-white">
        <ul className="grid grid-cols-5 text-[10px]">
          {ITEMS.slice(0, 5).map(({ key, href, Icon }) => {
            const active = pathname === href;
            return (
              <li key={key}>
                <Link
                  href={href}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2",
                    active ? "text-[var(--color-primary)]" : "text-[var(--color-muted)]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate max-w-[60px]">{t(key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
