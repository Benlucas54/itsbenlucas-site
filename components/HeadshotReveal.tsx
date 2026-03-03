"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";

export default function HeadshotReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mask, setMask] = useState<string | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMask(
      `radial-gradient(circle 80px at ${x}% ${y}%, transparent 30%, black 100%)`
    );
  }, []);

  const onMouseLeave = useCallback(() => {
    setMask(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-lg"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Bottom layer: pixelated image (revealed through mask hole) */}
      <Image
        src="/headshot-pixel.png"
        alt=""
        fill
        aria-hidden
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Top layer: clean image with mask */}
      <Image
        src="/headshot.png"
        alt="Ben Lucas"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        style={
          mask
            ? {
                maskImage: mask,
                WebkitMaskImage: mask,
              }
            : undefined
        }
      />
    </div>
  );
}
