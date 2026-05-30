"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address" 
        className="h-12 bg-black border border-white/20 rounded-md px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
        required
        disabled={submitted}
      />
      <button 
        type="submit" 
        disabled={submitted}
        className="h-12 bg-white text-black font-medium rounded-md hover:bg-accent hover:text-black transition-colors disabled:opacity-50"
      >
        {submitted ? "Subscribed!" : "Subscribe"}
      </button>
    </form>
  );
}
