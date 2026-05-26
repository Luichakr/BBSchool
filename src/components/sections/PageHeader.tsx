import { Container, Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Section className="bg-gradient-to-b from-white to-[var(--color-bg)] !py-12 md:!py-20">
      <Container>
        {kicker && (
          <Badge variant="primary" className="mb-4">
            {kicker}
          </Badge>
        )}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl">
            {subtitle}
          </p>
        )}
      </Container>
    </Section>
  );
}
