"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Scenario {
  tab: string;
  prompt: string;
  output: string[];
}

const scenarios: Scenario[] = [
  {
    tab: "App Builder",
    prompt:
      "Build me a habit tracker app with streaks, reminders, and a clean dashboard. Use Next.js and deploy it to Vercel.",
    output: [
      "Setting up Next.js project with TypeScript...",
      "Creating habit data model with streak logic...",
      "Building dashboard UI with progress rings...",
      "Adding push notification reminders...",
      "Deploying to Vercel... Live at habits.app",
      "✓ Full-stack app shipped in one prompt.",
    ],
  },
  {
    tab: "Product Creator",
    prompt:
      "Create a Notion template pack for freelancers — project tracker, invoice log, client CRM, and a content calendar. Make it sellable on Gumroad.",
    output: [
      "Designing project tracker with status pipeline...",
      "Building invoice log with auto-calculations...",
      "Creating client CRM with deal stages...",
      "Adding content calendar with platform tags...",
      "Generating Gumroad listing copy & mockups...",
      "✓ Digital product ready to sell.",
    ],
  },
  {
    tab: "Automation",
    prompt:
      "Build a content repurposing pipeline: take one long-form video transcript and turn it into 5 tweets, a LinkedIn post, a blog summary, and an email newsletter draft.",
    output: [
      "Parsing video transcript for key insights...",
      "Extracting 5 punchy tweet threads...",
      "Drafting LinkedIn post with hook + CTA...",
      "Writing blog summary with SEO structure...",
      "Composing email newsletter draft...",
      "✓ One video → 8 pieces of content.",
    ],
  },
];

const CYCLE_INTERVAL = 12000;
const CHAR_SPEED = 40;
const LINE_DELAY_BASE = 300;
const LINE_DELAY_INCREMENT = 150;

export default function PromptTerminal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "done">("typing");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (cycleRef.current) clearTimeout(cycleRef.current);
    if (charRef.current) clearInterval(charRef.current);
  }, []);

  const startScenario = useCallback(
    (index: number) => {
      clearAllTimers();
      setActiveIndex(index);
      setTypedPrompt("");
      setVisibleLines(0);
      setPhase("typing");

      const scenario = scenarios[index];
      let charIndex = 0;

      charRef.current = setInterval(() => {
        charIndex++;
        setTypedPrompt(scenario.prompt.slice(0, charIndex));

        if (charIndex >= scenario.prompt.length) {
          if (charRef.current) clearInterval(charRef.current);
          setPhase("output");

          // Reveal output lines sequentially
          scenario.output.forEach((_, lineIdx) => {
            timerRef.current = setTimeout(
              () => {
                setVisibleLines(lineIdx + 1);
                if (lineIdx === scenario.output.length - 1) {
                  setPhase("done");

                  // Auto-cycle to next
                  cycleRef.current = setTimeout(() => {
                    startScenario((index + 1) % scenarios.length);
                  }, CYCLE_INTERVAL);
                }
              },
              LINE_DELAY_BASE + lineIdx * LINE_DELAY_INCREMENT
            );
          });
        }
      }, CHAR_SPEED);
    },
    [clearAllTimers]
  );

  useEffect(() => {
    startScenario(0);
    return clearAllTimers;
  }, [startScenario, clearAllTimers]);

  function handleTabClick(index: number) {
    if (index === activeIndex) return;
    startScenario(index);
  }

  const scenario = scenarios[activeIndex];

  return (
    <section className="bg-brand-white-secondary px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-brand-black md:text-4xl">
          See What a Good Prompt Can Do
        </h2>
        <p className="mb-12 text-lg text-brand-black-secondary">
          One well-crafted prompt. A complete product. This is what I teach.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-xl bg-brand-black shadow-2xl min-h-[350px]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/10" />
            <span className="h-3 w-3 rounded-full bg-white/5" />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {scenarios.map((s, i) => (
              <button
                key={s.tab}
                onClick={() => handleTabClick(i)}
                className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors ${
                  i === activeIndex
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>

          {/* Terminal body */}
          <div className="p-5 font-mono text-sm leading-relaxed min-h-[270px]">
            {/* Prompt */}
            <div className="mb-4">
              <span className="text-green-400">$ </span>
              <span className="text-white/90">{typedPrompt}</span>
              {phase === "typing" && (
                <span className="inline-block w-2 h-4 ml-0.5 bg-white/80 animate-pulse align-middle" />
              )}
            </div>

            {/* Output */}
            <AnimatePresence mode="wait">
              {visibleLines > 0 && (
                <div className="space-y-1.5">
                  {scenario.output.slice(0, visibleLines).map((line, i) => (
                    <motion.p
                      key={`${activeIndex}-${i}`}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={
                        i === scenario.output.length - 1
                          ? "text-green-400 font-semibold mt-3"
                          : "text-white/60"
                      }
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Blinking cursor after output */}
            {phase === "done" && (
              <div className="mt-3">
                <span className="text-green-400">$ </span>
                <span className="inline-block w-2 h-4 ml-0.5 bg-white/80 animate-pulse align-middle" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
