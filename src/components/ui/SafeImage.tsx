"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "onLoad"> {
  wrapperClassName?: string;
}

export function SafeImage({ wrapperClassName = "", className = "", ...props }: SafeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isFill = !!props.fill;

  return (
    <div
      className={`${
        isFill ? "absolute inset-0 w-full h-full" : "relative"
      } overflow-hidden bg-zinc-900/40 ${!isLoaded ? "animate-pulse" : ""} ${wrapperClassName}`}
    >
      <Image
        {...props}
        onLoad={() => setIsLoaded(true)}
        className={`transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${className}`}
      />
    </div>
  );
}
