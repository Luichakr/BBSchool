"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  MessageCircle,
  X,
  Send,
  Mail,
  Calculator as CalcIcon,
} from "lucide-react";
import { CONTACTS } from "@/data/contacts";
import { Button } from "@/components/ui/Button";

export function ContactWidget() {
  const t = useTranslations("contactWidget");
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const options = t.raw("options") as { value: string; label: string }[];

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="contact-widget-panel"
        className={`fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] text-white px-4 py-3 shadow-lg shadow-blue-500/20 hover:bg-[var(--color-primary-dark)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] ${
          open ? "scale-90 opacity-0 pointer-events-none" : ""
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-medium">
          {t("trigger")}
        </span>
      </button>

      {/* Backdrop on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:bg-transparent md:pointer-events-none"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Panel */}
      <div
        id="contact-widget-panel"
        ref={panelRef}
        role="dialog"
        aria-label={t("title")}
        className={`fixed z-50 bg-white border border-[var(--color-border)] shadow-xl
          bottom-0 inset-x-0 rounded-t-2xl
          md:bottom-6 md:right-6 md:inset-x-auto md:w-[360px] md:rounded-2xl
          transition-transform origin-bottom-right
          ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"}`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 py-3">
          <div className="flex items-center gap-2 font-semibold">
            <MessageCircle className="h-5 w-5 text-[var(--color-primary)]" />
            {t("title")}
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul className="p-3 space-y-1.5">
          {options.map((opt) => (
            <li key={opt.value}>
              <Link
                href={`/contact?type=${opt.value}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm hover:bg-gray-50"
              >
                {opt.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-3 pt-0 grid grid-cols-2 gap-2">
          <a
            href="https://t.me/bidbidders"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-1 rounded-lg border border-[var(--color-border)] py-2 text-xs hover:bg-gray-50"
          >
            <Send className="h-4 w-4" />
            {t("telegram")}
          </a>
          <a
            href={`mailto:${CONTACTS.bidbidders.email}`}
            className="inline-flex flex-col items-center gap-1 rounded-lg border border-[var(--color-border)] py-2 text-xs hover:bg-gray-50"
          >
            <Mail className="h-4 w-4" />
            {t("email")}
          </a>
        </div>
        <div className="border-t border-[var(--color-border)] p-3 space-y-2">
          <Link
            href="/calculator"
            onClick={() => setOpen(false)}
            className="block"
          >
            <Button variant="outline" className="w-full" size="sm">
              <CalcIcon className="h-4 w-4" />
              {t("openCalculator")}
            </Button>
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block">
            <Button className="w-full" size="sm">
              {t("openForm")}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
