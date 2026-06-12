"use client";

import { useState } from "react";
import { BrandIcon } from "./BrandIcon";

export function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-red-950/90 border-t border-red-500/30 backdrop-blur-md px-6 py-4 flex items-center justify-between gap-4 text-left">
      <div className="flex items-center gap-3 max-w-4xl mx-auto w-full">
        <BrandIcon id="warning" className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-xs text-red-200 leading-normal">
          <strong>Medical Disclaimer:</strong> This website documents my personal recovery journey. I am not a medical doctor. The details, protocols, and guides shared here are not medical advice and are not intended to diagnose, treat, or prevent any illness. Always consult a qualified physician.
        </p>
      </div>
      <button 
        onClick={() => setDismissed(true)} 
        className="text-red-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest shrink-0"
        aria-label="Dismiss disclaimer"
      >
        [Dismiss]
      </button>
    </div>
  );
}
