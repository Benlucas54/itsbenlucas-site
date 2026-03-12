"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["entrepreneur", "solopreneur", "promptpreneur"];

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Word morph sequence
  useEffect(() => {
    if (wordIndex < WORDS.length - 1) {
      const timer = setTimeout(() => setWordIndex((i) => i + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIntroComplete(true), 600);
      return () => clearTimeout(timer);
    }
  }, [wordIndex]);

  // Mouse glow tracker
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <motion.main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden sm:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(224, 90, 51, 0.07), transparent 80%)`,
        }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Word morph heading */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 h-[1.3em] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[wordIndex]}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </h1>

          {/* Content fades in after intro */}
          <AnimatePresence>
            {introComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm text-neutral-500 mb-1 italic">
                  /prɒmpt·prə&apos;nɜːr/ &nbsp;·&nbsp; noun
                </p>
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mt-4">
                  Someone who uses AI prompts to build products, income streams, and
                  businesses online.
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  No tech background. No code. Just the right words — and the results
                  speak for themselves.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtext + Form fade in after intro */}
        <AnimatePresence>
          {introComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-neutral-400 mb-8">
                I&apos;m building something for promptpreneurs. Join the waitlist to
                be first in.
              </p>

              {status === "success" ? (
                <motion.p
                  className="text-brand-accent text-lg font-medium"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  You&apos;re in. I&apos;ll be in touch.
                </motion.p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 max-w-sm px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-3 rounded-lg bg-brand-accent text-white font-medium hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {status === "loading" ? "Joining..." : "Join the Waitlist"}
                  </button>
                </form>
              )}

              {status === "error" && (
                <p className="text-red-400 text-sm mt-3">{errorMsg}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-neutral-600 text-xs">
        &copy; 2026 Ben Lucas
      </p>
    </motion.main>
  );
}
