"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["entrepreneur", "solopreneur", "promptpreneur"];
const DEFINITION =
  "1. Someone who uses AI prompts to build products, income streams, and businesses online.";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [typingStarted, setTypingStarted] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

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

  // Start typing after intro completes
  useEffect(() => {
    if (!introComplete) return;
    const timer = setTimeout(() => setTypingStarted(true), 500);
    return () => clearTimeout(timer);
  }, [introComplete]);

  // Typewriter interval
  useEffect(() => {
    if (!typingStarted) return;
    const interval = setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= DEFINITION.length) {
          clearInterval(interval);
          setTypingDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [typingStarted]);

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
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(224, 90, 51, 0.09), transparent 80%)`,
        }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Word morph heading */}
        <div className="mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2 h-[1.3em] flex items-center justify-center">
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

          {/* Pronunciation — fades in immediately on introComplete */}
          <AnimatePresence>
            {introComplete && (
              <motion.p
                className="font-serif text-sm text-neutral-500 mb-1 italic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                /prɒmpt·prə&apos;nɜːs/ &nbsp;·&nbsp; noun
              </motion.p>
            )}
          </AnimatePresence>

          {/* Definition — typewriter effect */}
          {typingStarted && (
            <p className="font-serif text-base sm:text-lg text-neutral-700 leading-relaxed mt-4">
              {DEFINITION.slice(0, typedCount)}
              {!typingDone && (
                <span className="typing-cursor">|</span>
              )}
            </p>
          )}

          {/* Italic line — fades in after typing completes */}
          <AnimatePresence>
            {typingDone && (
              <motion.p
                className="text-sm text-neutral-500 mt-2 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                No tech background. No code. Just the right words — and the results
                speak for themselves.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Subtext + Form fade in after typing completes */}
        <AnimatePresence>
          {typingDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-neutral-500 mb-8">
                The Promptpreneur Newsletter. Weekly AI insights for builders.
              </p>

              {status === "success" ? (
                <motion.div
                  className="text-brand-accent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-lg font-medium">
                    You&apos;re subscribed. First issue lands soon.
                  </p>
                  <p className="mt-2 text-sm">— Ben</p>
                </motion.div>
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
                    className="flex-1 max-w-sm px-4 py-3 rounded-lg bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-3 rounded-lg bg-brand-accent text-white font-medium hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
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
      <p className="absolute bottom-6 text-neutral-400 text-xs">
        &copy; 2026 Ben Lucas
      </p>
    </motion.main>
  );
}
