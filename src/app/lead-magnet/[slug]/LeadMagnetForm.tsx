"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

interface LeadMagnetFormProps {
  slug: string;
  downloadUrl: string;
}

export default function LeadMagnetForm({ slug, downloadUrl }: LeadMagnetFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, magnet: slug }),
      });
      if (res.ok) {
        setSuccess(true);
        track('lead_magnet_download', { magnet: slug, source: 'lead-magnet-page' });
        // Safely trigger download in a new tab
        window.open(downloadUrl, "_blank");
        // Redirect to thank you page
        router.push(`/lead-magnet/${slug}/thank-you`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Failed to submit.");
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col sm:flex-row gap-4 relative z-10" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 h-14 bg-zinc-900 border border-white/20 rounded-lg px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
        required
        disabled={loading || success}
      />
      <Button size="lg" className="h-14 rounded-lg" disabled={loading || success}>
        {loading ? "Sending..." : success ? "Sent!" : "Download Guide"}
      </Button>
    </form>
  );
}
