"use client";

import { motion } from "framer-motion";
import StaggerContainer from "@/components/motion/StaggerContainer";

const cards = [
  {
    title: "AI App Building",
    description:
      "Build and sell apps on platforms like Whop. No coding degree required.",
  },
  {
    title: "AI Products & Systems",
    description:
      "Create digital products, automate workflows, and package what you know.",
  },
  {
    title: "Prompting That Pays",
    description:
      "Learn to write prompts that build things worth selling.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function SolutionSection() {
  return (
    <section className="bg-brand-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-3xl font-bold text-brand-black md:text-4xl">
          Here&apos;s what changed everything
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-brand-black-secondary">
          I stopped trying to learn everything and started building. AI tools
          like ChatGPT and Claude let you create real products — apps, digital
          tools, content systems — without writing a single line of code
          yourself. I&apos;m documenting the whole journey and helping others do
          the same.
        </p>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 24px rgba(18,18,18,0.08)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="rounded-lg border border-brand-divider bg-brand-white-secondary p-8 transition-colors"
            >
              <h3 className="mb-3 text-xl font-bold text-brand-black">
                {card.title}
              </h3>
              <p className="text-brand-black-secondary">{card.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
