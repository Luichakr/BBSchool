import type { Metadata } from "next";

// Mock checkout flow — no real payments. Exclude from search indexing.
// Applies to /checkout and /checkout/success.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
