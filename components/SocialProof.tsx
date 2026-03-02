"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 30, suffix: "", label: "Days to build & ship apps" },
  { value: 100, suffix: "%", label: "Course content praised as paid-quality" },
  { value: 5, suffix: "+", label: "White-label clients paying for builds" },
];

function AnimatedCounter({
  target,
  suffix,
  started,
}: {
  target: number;
  suffix: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    const duration = 1500;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setStarted(true);
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-black-tertiary px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4 text-2xl font-bold text-brand-white md:text-3xl"
        >
          &ldquo;Ben, I owe you a beer. You&apos;re a legend.&rdquo;
        </motion.blockquote>
        <p className="mb-12 text-sm text-brand-white/60">— Community member</p>
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-brand-white md:text-5xl">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  started={started}
                />
              </p>
              <p className="mt-2 text-sm font-medium text-brand-white/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
