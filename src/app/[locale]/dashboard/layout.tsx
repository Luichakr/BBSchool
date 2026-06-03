import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardGuard } from "@/components/dashboard/DashboardGuard";

// Mock student dashboard — not a real cabinet. Block from search indexing so
// it never shows up in Google for academy queries. Also excluded from
// sitemap.ts and disallowed in robots.ts.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-bg)]">
      <Container className="flex gap-6 py-6 pb-24 md:pb-10">
        <DashboardGuard>
          <DashboardSidebar />
          <div className="flex-1 min-w-0">{children}</div>
        </DashboardGuard>
      </Container>
    </div>
  );
}
