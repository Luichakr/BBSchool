import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { Accordion } from "@/components/ui/Accordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const items = (t.raw as (k: string) => unknown)("faq.items") as {
    q: string;
    a: string;
  }[];
  return {
    title: t("faq.title"),
    other: {
      "application-ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      }),
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const items = (t.raw as (k: string) => unknown)("faq.items") as {
    q: string;
    a: string;
  }[];
  return (
    <>
      <PageHeader title={t("faq.title")} />
      <Section className="!pt-0">
        <Container>
          <Accordion items={items} />
        </Container>
      </Section>
    </>
  );
}
