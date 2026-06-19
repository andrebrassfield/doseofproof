"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "./Button";

interface ExitIntentPopupProps {
  enabled?: boolean;
  delay?: number;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function ExitIntentPopup({
  enabled = true,
  delay = 5000,
  title = "Get the Testing Roadmap",
  subtitle = "The exact lab panels, scan protocols, and reference ranges that caught what 12 doctors missed.",
  ctaText = "Send Me the Roadmap",
  ctaUrl = "/testing-roadmap",
}: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (!enabled || hasShown) return;
      if (e.clientY <= 0) {
        setIsOpen(true);
        setHasShown(true);
      }
    },
    [enabled, hasShown]
  );

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [enabled, handleMouseLeave]);

  useEffect(() => {
    if (!enabled || hasShown) return;
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [enabled, delay, hasShown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-4 max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-neutral-500 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="mb-2 text-2xl font-bold text-white">{title}</h2>
        <p className="mb-6 text-neutral-400">{subtitle}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = ctaUrl;
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="email"
            placeholder="your@email.com"
            required
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 focus:border-white focus:outline-none"
          />
          <Button type="submit" className="w-full">
            {ctaText}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-neutral-600">
          No spam. Unsubscribe anytime. Just evidence.
        </p>
      </div>
    </div>
  );
}
