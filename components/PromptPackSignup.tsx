"use client";

import { useState, type FormEvent } from "react";

const included = [
  "Prompts for your first AI product idea",
  "Content creation prompts that actually work",
  "Automation starters to save you hours",
  "Access to a live Notion database you can duplicate",
];

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
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-brand-black">
            Check your inbox
          </h2>
          <p className="text-lg text-brand-black-secondary">
            The prompt pack is on its way.
          </p>
        </div>
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
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-black" />
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
            className="flex-1 rounded-lg border border-brand-divider bg-brand-white px-4 py-3 text-brand-black outline-none focus:border-brand-black-secondary"
          />
          <input
            name="signup-email"
            type="email"
            placeholder="Your email"
            required
            className="flex-1 rounded-lg border border-brand-divider bg-brand-white px-4 py-3 text-brand-black outline-none focus:border-brand-black-secondary"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-lg bg-brand-black px-8 py-3 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-black-secondary disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Me the Prompt Pack"}
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
