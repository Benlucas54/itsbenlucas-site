export default function Hero() {
  return (
    <section className="bg-brand-white px-6 py-20 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-black-secondary">
          The Promptpreneur
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-brand-black md:text-5xl lg:text-6xl">
          Learn to Build AI Apps. No Tech Background Needed.
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-brand-black-secondary">
          I help regular people make their first money with AI — from zero to
          building and selling real products. Even if you think this isn&apos;t
          for you.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#work-with-me"
            className="inline-block rounded-lg bg-brand-black px-8 py-3.5 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-black-secondary"
          >
            Work With Me
          </a>
          <a
            href="#free-prompt-pack"
            className="inline-block rounded-lg border-2 border-brand-black px-8 py-3.5 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-black hover:text-brand-white"
          >
            Get the Free Prompt Pack
          </a>
        </div>
        <p className="mt-8 text-sm text-brand-black-secondary">
          No jargon. No tech speak. Just real results from real people.
        </p>
      </div>
    </section>
  );
}
