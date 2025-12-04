"use client";

import * as React from "react";
import { useSliderPalette } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type LogoMaskProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  brandColor?: string;
};

export function LogoMask({ src, alt, size = 64, className, brandColor }: LogoMaskProps) {
  const palette = useSliderPalette();
  const scheme = palette?.scheme ?? "brand";
  const monochromeColor = palette?.color ?? "#ffffff";
  const gradientA = palette?.color ?? "#22d3ee";
  const gradientB = palette?.color2 ?? "#9333ea";
  const bg =
    scheme === "gradient"
      ? `linear-gradient(135deg, ${gradientA}, ${gradientB})`
      : scheme === "monochrome"
      ? monochromeColor
      : brandColor || monochromeColor;

  return (
    <div
      className={cn("relative", className)}
      aria-label={alt}
      style={{ width: size, height: size }}
    >
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          width: size,
          height: size,
          background: bg,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          filter: "contrast(1.1)",
        }}
      />
      <div
        className="absolute inset-0 rounded-md pointer-events-none"
        style={{ transition: "filter 300ms", filter: "brightness(1)" }}
      />
    </div>
  );
}

