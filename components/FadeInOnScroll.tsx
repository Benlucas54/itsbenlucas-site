"use client";

import { useRef, useEffect, type ReactNode } from "react";

export default function FadeInOnScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("fade-in-hidden");
          el.classList.add("fade-in-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    el.classList.add("fade-in-hidden");
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
