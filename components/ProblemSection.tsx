"use client";

import StaggerContainer from "@/components/motion/StaggerContainer";
import StaggerItem from "@/components/motion/StaggerItem";

const painPoints = [
  "You see everyone talking about AI and making money online, but you don\u2019t know where to start.",
  "You\u2019ve tried ChatGPT a few times but have no idea how to actually turn it into income.",
  "You think building apps or software is for \u201Ctech people\u201D \u2014 not someone like you.",
  "You\u2019re stuck in the scroll, watching others build things while you wonder how.",
];

export default function ProblemSection() {
  return (
    <section className="bg-brand-white-secondary px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[680px]">
        <h2 className="mb-10 text-3xl font-bold text-brand-black md:text-4xl">
          Sound familiar?
        </h2>
        <StaggerContainer className="space-y-6 text-lg leading-relaxed text-brand-black-secondary">
          {painPoints.map((point) => (
            <StaggerItem key={point}>
              <p>{point}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <p className="mt-10 text-lg font-medium text-brand-black">
          I was exactly where you are. Shiny object syndrome, spinning my
          wheels, trying everything and finishing nothing. Until I found AI and
          software.
        </p>
      </div>
    </section>
  );
}
