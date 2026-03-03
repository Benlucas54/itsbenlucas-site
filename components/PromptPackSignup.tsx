"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const included = [
  "Prompts for your first AI product idea",
  "Content creation prompts that actually work",
  "Automation starters to save you hours",
  "Access to a live Notion database you can duplicate",
];

function AnimatedCheckmark() {
  return (
    <motion.svg
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="mx-auto mb-6"
    >
      <motion.circle
        cx="32"
        cy="32"
        r="30"
        stroke="#e05a33"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.path
        d="M20 33 L28 41 L44 25"
        stroke="#e05a33"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="inline-block h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-75"
      />
    </svg>
  );
}

export default function PromptPackSignup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("signup-name") as HTMLInputElement).value,
      email: (form.elements.namedItem("signup-email") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="free-prompt-pack" className="bg-brand-white-secondary px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <AnimatedCheckmark />
          <h2 className="mb-4 text-3xl font-bold text-brand-black">
            Thank you for joining the waitlist
          </h2>
          <p className="text-lg text-brand-black-secondary">
            You&apos;re in! We&apos;ll let you know when the prompt pack is ready.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="free-prompt-pack" className="bg-brand-white-secondary px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold text-brand-black md:text-4xl">
          Grab the Free AI Starter Prompt Pack
        </h2>
        <p className="mb-8 text-lg text-brand-black-secondary">
          Not sure where to begin? This prompt pack gives you ready-to-use
          prompts for building your first AI products, creating content, and
          automating boring tasks. It&apos;s the exact starting point I wish I
          had.
        </p>

        <ul className="mb-10 space-y-3">
          {included.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-brand-black-secondary"
            >
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
              {item}
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <input
            name="signup-name"
            type="text"
            placeholder="Your name"
            required
            className="flex-1 rounded-lg border border-brand-divider bg-brand-white px-4 py-3 text-brand-black outline-none transition-shadow duration-200 focus:border-brand-black-secondary focus:ring-2 focus:ring-brand-black/10"
          />
          <input
            name="signup-email"
            type="email"
            placeholder="Your email"
            required
            className="flex-1 rounded-lg border border-brand-divider bg-brand-white px-4 py-3 text-brand-black outline-none transition-shadow duration-200 focus:border-brand-black-secondary focus:ring-2 focus:ring-brand-black/10"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-lg bg-brand-accent px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-black hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <LoadingSpinner /> Sending...
              </span>
            ) : (
              "Join the Waitlist"
            )}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
        )}

        <p className="mt-4 text-xs text-brand-black-secondary">
          No spam. Just useful stuff. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
