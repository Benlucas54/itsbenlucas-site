"use client";

import { motion } from "framer-motion";

const headline = "Learn to Build AI Apps. No Tech Background Needed.";
const words = headline.split(" ");

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section className="hero-grid-bg relative overflow-hidden bg-brand-white px-6 py-20 md:py-32">
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-black-secondary"
        >
          The Promptpreneur
        </motion.p>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 text-4xl font-bold leading-tight text-brand-black md:text-5xl lg:text-6xl"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.3em]">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: words.length * 0.08 + 0.2 }}
          className="mx-auto mb-10 max-w-xl text-lg text-brand-black-secondary"
        >
          I help regular people make their first money with AI — from zero to
          building and selling real products. Even if you think this isn&apos;t
          for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: words.length * 0.08 + 0.4 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#work-with-me"
            className="inline-block rounded-lg bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-black hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            Work With Me
          </a>
          <a
            href="#free-prompt-pack"
            className="inline-block rounded-lg border-2 border-brand-black px-8 py-3.5 text-sm font-semibold text-brand-black transition-all duration-200 hover:bg-brand-black hover:text-brand-white hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            Get the Free Prompt Pack
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: words.length * 0.08 + 0.6 }}
          className="mt-8 text-sm text-brand-black-secondary"
        >
          No jargon. No tech speak. Just real results from real people.
        </motion.p>
      </div>
    </section>
  );
}
