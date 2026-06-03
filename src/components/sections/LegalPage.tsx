import { Container, Section } from "@/components/ui/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "./PageHeader";

export type LegalSection = { heading: string; paragraphs: string[] };

export type LegalCompany = {
  title: string;
  legalName: string;
  nip?: string;
  nipLabel: string;
  regon?: string;
  regonLabel: string;
  address: string;
  email: string;
  phone: string;
};

export function LegalPage({
  title,
  body,
  sections,
  company,
  updated,
}: {
  title: string;
  body?: string[];
  sections?: LegalSection[];
  company?: LegalCompany;
  updated?: string;
}) {
  return (
    <>
      <PageHeader title={title} />
      <Section className="!pt-0">
        <Container className="max-w-3xl">
          {company && (
            <Card className="mb-4">
              <CardBody className="text-sm">
                <div className="font-semibold">{company.title}</div>
                <div className="mt-2 space-y-0.5 text-[var(--color-muted)]">
                  <div className="font-medium text-[var(--color-text)]">
                    {company.legalName}
                  </div>
                  {company.nip && (
                    <div>
                      {company.nipLabel}: {company.nip}
                    </div>
                  )}
                  {company.regon && (
                    <div>
                      {company.regonLabel}: {company.regon}
                    </div>
                  )}
                  <div>{company.address}</div>
                  <div>
                    <a
                      href={`mailto:${company.email}`}
                      className="hover:text-[var(--color-primary)]"
                    >
                      {company.email}
                    </a>{" "}
                    ·{" "}
                    <a
                      href={`tel:${company.phone.replace(/\s/g, "")}`}
                      className="hover:text-[var(--color-primary)]"
                    >
                      {company.phone}
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardBody className="space-y-6 text-sm leading-relaxed text-[var(--color-muted)]">
              {updated && <p className="text-xs">{updated}</p>}
              {sections?.map((s, i) => (
                <div key={i} className="space-y-2">
                  <h2 className="font-semibold text-[var(--color-text)]">
                    {s.heading}
                  </h2>
                  {s.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              ))}
              {body?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </CardBody>
          </Card>
        </Container>
      </Section>
    </>
  );
}
