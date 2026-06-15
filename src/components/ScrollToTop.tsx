"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scrolls to the top of the page on every route change. App Router has
// automatic scroll restoration, but layout-level state (header, sidebar)
// occasionally keeps the previous scroll position on client transitions.
export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}
