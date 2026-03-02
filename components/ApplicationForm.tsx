"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const aiLevels = [
  "Complete beginner - never really used it",
  "Dabbled a bit - used ChatGPT but nothing serious",
  "Intermediate - built a few things, want to level up",
  "Advanced - already making money, want to scale",
];

const interests = [
  "Learning AI from scratch",
  "Building an app or digital product",
  "Done-with-you sprint / direct support",
  "Not sure yet - just exploring",
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

export default function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      currentLevel: (form.elements.namedItem("currentLevel") as HTMLSelectElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      additionalInfo: (form.elements.namedItem("additionalInfo") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/application", {
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
      <section id="work-with-me" className="bg-brand-white px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <AnimatedCheckmark />
          <h2 className="mb-4 text-3xl font-bold text-brand-black">
            Nice one — I&apos;ve got your details.
          </h2>
          <p className="text-lg text-brand-black-secondary">
            I&apos;ll be in touch soon.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="work-with-me" className="bg-brand-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold text-brand-black md:text-4xl">
          Work With Me
        </h2>
        <p className="mb-6 text-lg text-brand-black-secondary">
          Whether you&apos;re starting from scratch or you&apos;ve been dabbling
          and want to go further, I&apos;ve got options that fit where you are.
          Fill in the form below and I&apos;ll get back to you with the best
          next step.
        </p>
        <div className="mb-10 space-y-2 text-sm text-brand-black-secondary">
          <p>Starter course for complete beginners (£27)</p>
          <p>Intermediate course to build to £1K/month (£100)</p>
          <p>Done-with-you sprint for serious builders (from £2K)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="app-name" className="mb-1.5 block text-sm font-medium text-brand-black">
              Name
            </label>
            <input
              id="app-name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-brand-divider bg-brand-white-secondary px-4 py-3 text-brand-black outline-none transition-shadow duration-200 focus:border-brand-black-secondary focus:ring-2 focus:ring-brand-black/10"
            />
          </div>

          <div>
            <label htmlFor="app-email" className="mb-1.5 block text-sm font-medium text-brand-black">
              Email
            </label>
            <input
              id="app-email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-brand-divider bg-brand-white-secondary px-4 py-3 text-brand-black outline-none transition-shadow duration-200 focus:border-brand-black-secondary focus:ring-2 focus:ring-brand-black/10"
            />
          </div>

          <div>
            <label htmlFor="currentLevel" className="mb-1.5 block text-sm font-medium text-brand-black">
              Where are you at with AI right now?
            </label>
            <select
              id="currentLevel"
              name="currentLevel"
              required
              className="w-full rounded-lg border border-brand-divider bg-brand-white-secondary px-4 py-3 text-brand-black outline-none transition-shadow duration-200 focus:border-brand-black-secondary focus:ring-2 focus:ring-brand-black/10"
              defaultValue=""
            >
              <option value="" disabled>
                Select one...
              </option>
              {aiLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-brand-black">
              What are you most interested in?
            </label>
            <select
              id="interest"
              name="interest"
              required
              className="w-full rounded-lg border border-brand-divider bg-brand-white-secondary px-4 py-3 text-brand-black outline-none transition-shadow duration-200 focus:border-brand-black-secondary focus:ring-2 focus:ring-brand-black/10"
              defaultValue=""
            >
              <option value="" disabled>
                Select one...
              </option>
              {interests.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="additionalInfo" className="mb-1.5 block text-sm font-medium text-brand-black">
              Anything else you want me to know?{" "}
              <span className="font-normal text-brand-black-secondary">(optional)</span>
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              rows={4}
              className="w-full rounded-lg border border-brand-divider bg-brand-white-secondary px-4 py-3 text-brand-black outline-none transition-shadow duration-200 focus:border-brand-black-secondary focus:ring-2 focus:ring-brand-black/10"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-black hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <LoadingSpinner /> Sending...
              </span>
            ) : (
              "Send My Application"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
