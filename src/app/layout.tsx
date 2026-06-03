import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

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
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script src="https://cdn.usefathom.com/script.js" data-site="YOUR_FATHOM_SITE_ID" data-excluded-domains="shop.doseofproof.com" defer />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
