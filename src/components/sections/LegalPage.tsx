import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "./PageHeader";

export function LegalPage({
  title,
  body,
}: {
  title: string;
  body: string[];
}) {
  return (
    <>
      <PageHeader title={title} />
      <Section className="!pt-0">
        <Container className="max-w-3xl">
          <Card>
            <CardBody className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)]">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </CardBody>
          </Card>
        </Container>
      </Section>
    </>
  );
}
