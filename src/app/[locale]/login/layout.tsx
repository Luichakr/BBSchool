import type { Metadata } from "next";

// Transactional / auth page — exclude from search indexing.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
