const markers = [
  "Apps built and shipped in 30 days",
  'Course content praised as "paid-course quality"',
  "White-label clients paying to use my builds",
];

export default function SocialProof() {
  return (
    <section className="bg-brand-black-tertiary px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <blockquote className="mb-4 text-2xl font-bold text-brand-white md:text-3xl">
          &ldquo;Ben, I owe you a beer. You&apos;re a legend.&rdquo;
        </blockquote>
        <p className="mb-12 text-sm text-brand-white/60">
          — Community member
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {markers.map((marker) => (
            <p
              key={marker}
              className="text-sm font-medium text-brand-white/80"
            >
              {marker}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
