// lib/analytics.ts — wrapper for Fathom + custom events

export const track = (event: string, props?: { value?: number; [key: string]: any }) => {
  if (typeof window !== 'undefined' && window.fathom) {
    try {
      window.fathom.trackGoal(event, props?.value ?? 0);
      console.log(`[Analytics] Tracked event: ${event}`, props);
    } catch (e) {
      console.error("[Analytics] Fathom tracking error:", e);
    }
  } else if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Simulation] Event: ${event}`, props);
  }
};

declare global {
  interface Window {
    fathom?: {
      trackGoal: (code: string, centsValue: number) => void;
      trackPageview: (params?: any) => void;
    };
  }
}
