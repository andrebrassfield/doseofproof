import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ComplianceGate } from "@/components/compliance/ComplianceGate";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://doseofproof.com'),
  title: {
    default: 'Dose of Proof | Not selling. Just proving.',
    template: '%s | Dose of Proof',
  },
  description: 'Documenting the actual terrain of CCI, MCAS, mold recovery, and evidence-backed health optimization.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://doseofproof.com',
    siteName: 'Dose of Proof',
    images: [
      {
        url: '/api/og?title=Dose+of+Proof&category=TERRAIN&description=Not+selling.+Just+proving.+Documenting+the+actual+recovery.',
        width: 1200,
        height: 630,
        alt: 'Dose of Proof — Documenting The Recovery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dose of Proof | Not selling. Just proving.',
    description: 'Documenting the actual terrain of CCI, MCAS, mold recovery, and evidence-backed health optimization.',
    images: ['/api/og?title=Dose+of+Proof&category=TERRAIN&description=Not+selling.+Just+proving.+Documenting+the+actual+recovery.'],
    creator: '@andrebrassfield',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fathomId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID || "ABC123";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://cdn.usefathom.com/script.js"
          data-site={fathomId}
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-black font-mono text-xs uppercase tracking-widest py-3 px-6 rounded-lg z-[100] border border-accent/30 shadow-lg shadow-accent/10">
          Skip to content
        </a>
        <SmoothScroll />
        <ComplianceGate />
        {children}
      </body>
    </html>
  );
}
