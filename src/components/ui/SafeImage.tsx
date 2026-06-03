"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends ImageProps {
  wrapperClassName?: string;
}

export function SafeImage({
  wrapperClassName = "",
  className = "",
  sizes,
  onLoad,
  onError,
  fill,
  alt,
  ...props
}: SafeImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const isFill = !!fill;
  const imageSizes = sizes ?? (isFill ? "100vw" : undefined);

  return (
    <div
      className={`${
        isFill ? "absolute inset-0 w-full h-full" : "relative"
      } overflow-hidden bg-zinc-900/40 ${wrapperClassName}`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-zinc-900/60 transition-opacity duration-500 ${
          isLoading ? "animate-pulse opacity-100" : "opacity-0"
        }`}
      />
      <Image
        {...props}
        alt={alt}
        fill={fill}
        sizes={imageSizes}
        onLoad={(event) => {
          setIsLoading(false);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoading(false);
          onError?.(event);
        }}
        className={`transition-opacity duration-700 ease-out ${className}`}
      />
    </div>
  );
}
