"use client";

import { useEffect } from "react";
import Script from "next/script";

interface LemonsqueezyEmbedProps {
  url: string;
  label?: string;
  className?: string;
}

export function LemonsqueezyEmbed({ url, label = "Buy Now", className = "" }: LemonsqueezyEmbedProps) {
  useEffect(() => {
    // If the script is already loaded, refresh lemonsqueezy
    if (window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
  }, []);

  return (
    <>
      <Script src="https://app.lemonsqueezy.com/js/app.js" strategy="afterInteractive" />
      <a 
        href={url} 
        className={`lemonsqueezy-button ${className}`}
      >
        {label}
      </a>
    </>
  );
}

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
  }
}
