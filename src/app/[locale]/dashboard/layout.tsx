import { Container } from "@/components/ui/Container";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-bg)]">
      <Container className="flex gap-6 py-6 pb-24 md:pb-10">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </Container>
    </div>
  );
}
