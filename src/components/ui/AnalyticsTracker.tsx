"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

interface AnalyticsTrackerProps {
  event: string;
  params?: Record<string, any>;
}

export function AnalyticsTracker({ event, params }: AnalyticsTrackerProps) {
  useEffect(() => {
    track(event, params);
  }, [event, JSON.stringify(params)]);

  return null;
}
