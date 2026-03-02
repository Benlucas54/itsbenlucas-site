export default function AboutSection() {
  return (
    <section className="bg-brand-white px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-black-secondary">
            Who&apos;s behind this
          </p>
          <h2 className="mb-6 text-3xl font-bold text-brand-black md:text-4xl">
            I&apos;m Ben. I&apos;m probably 6 months ahead of you.
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-brand-black-secondary">
            <p>
              I spent years bouncing between side hustles — videography, dog
              walking, agency work — never really landing on the thing. Then I
              found AI and software. Now I build apps, create digital products,
              and help other people do the same. I&apos;m not some guru
              who&apos;s been doing this for a decade. I&apos;m the guy who was
              stuck, found the path, and turned around to show others the way.
            </p>
            <p>
              Everything I teach comes from what I&apos;m actually doing right
              now. Not theory from five years ago. Real builds, real results,
              documented in real time.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex h-80 w-full items-center justify-center rounded-lg bg-brand-divider text-brand-black-secondary">
            Profile image
          </div>
        </div>
      </div>
    </section>
  );
}
