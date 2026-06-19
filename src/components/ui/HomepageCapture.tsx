"use client";

import { useState } from "react";
import { Button } from "./Button";

interface HomepageCaptureProps {
  variant?: "hero" | "inline" | "footer";
}

export function HomepageCapture({ variant = "hero" }: HomepageCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with newsletter provider (ConvertKit, Beehiiv, etc.)
    console.log("Email captured:", email);
    setSubmitted(true);
  };

  if (variant === "hero") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          The evidence starts here.
        </h2>
        <p className="mb-8 text-lg text-neutral-400">
          Weekly deep dives into what actually moves the needle — lab analysis,
          scan interpretation, and protocol updates from someone who&apos;s
          tracking everything.
        </p>

        {submitted ? (
          <div className="rounded-lg border border-emerald-800 bg-emerald-950/50 p-4 text-emerald-400">
            ✓ Check your inbox. The roadmap is on its way.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 focus:border-white focus:outline-none"
            />
            <Button type="submit" className="whitespace-nowrap">
              Get the Testing Roadmap
            </Button>
          </form>
        )}

        <p className="mt-4 text-sm text-neutral-600">
          Join 2,847 people tracking their recovery with data. No spam. Unsubscribe
          anytime.
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="my-12 rounded-xl border border-neutral-800 bg-neutral-950 p-6">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              Want the full testing roadmap?
            </h3>
            <p className="text-sm text-neutral-400">
              Free guide: every lab, scan, and reference range I&apos;ve used to
              map my recovery.
            </p>
          </div>
          {submitted ? (
            <span className="text-emerald-400">✓ Sent</span>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
              />
              <Button type="submit" className="whitespace-nowrap text-sm">
                Get Roadmap
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // footer variant
  return (
    <div className="border-t border-neutral-800 bg-neutral-950 py-8">
      <div className="mx-auto max-w-md text-center">
        <h3 className="mb-2 text-lg font-semibold text-white">
          Stay in the loop
        </h3>
        <p className="mb-4 text-sm text-neutral-400">
          Weekly evidence-first updates on CCI, mold, MCAS, and autonomic
          recovery.
        </p>
        {submitted ? (
          <span className="text-emerald-400">✓ You&apos;re in</span>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
            />
            <Button type="submit" className="whitespace-nowrap text-sm">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
