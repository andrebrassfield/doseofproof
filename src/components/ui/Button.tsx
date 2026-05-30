"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", href, children, ...props }, ref) => {
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics configuration
    const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (reduce) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      // Calculate magnetic pull (-10px to +10px roughly)
      x.set((e.clientX - rect.left - h) * 0.15);
      y.set((e.clientY - rect.top - v) * 0.15);
    };

    const handleMouseLeave = () => {
      if (reduce) return;
      x.set(0);
      y.set(0);
    };

    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group";

    const variants = {
      primary: "bg-accent text-black hover:bg-accent/90",
      secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/5",
      ghost: "hover:bg-white/10 text-white",
    };

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 px-4 text-xs",
      lg: "h-14 px-8 text-base",
    };

    const MotionButton = motion.button;
    const MotionLink = motion.create(Link);

    const commonProps = {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: {
        x: reduce ? 0 : springX,
        y: reduce ? 0 : springY,
      },
      whileTap: { scale: 0.98 },
      className: cn(baseStyles, variants[variant], sizes[size], className),
    };

    if (href) {
      return (
        <MotionLink href={href} {...props as any} {...commonProps as any}>
          {children}
        </MotionLink>
      );
    }

    return (
      <MotionButton ref={ref} {...props as any} {...commonProps as any}>
        {children}
      </MotionButton>
    );
  }
);
Button.displayName = "Button";
