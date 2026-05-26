import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

const NAV = [
  { href: "/manager", label: "Overview" },
  { href: "/manager/bid-requests", label: "Bid requests" },
  { href: "/manager/purchases", label: "Purchases" },
  { href: "/manager/auto-w-drodze", label: "Auto in transit" },
  { href: "/manager/users", label: "Users" },
] as const;

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      <Container className="py-6">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
          <h2 className="font-semibold">Manager (mock)</h2>
          <nav className="flex flex-wrap gap-3 text-sm">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-[var(--color-muted)] hover:text-[var(--color-text)]">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-6">{children}</div>
      </Container>
    </div>
  );
}
