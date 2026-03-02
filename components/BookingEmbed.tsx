export default function BookingEmbed() {
  return (
    <section id="work-with-me" className="bg-brand-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold text-brand-black md:text-4xl">
          Work With Me
        </h2>
        <p className="mb-10 text-lg text-brand-black-secondary">
          Book a free discovery call and let&apos;s figure out the best way I can help you.
        </p>
        <iframe
          src="https://formifycrm.com/book/formifyllc263x8xj3udn/promptpreneur-discovery-call?type=option2"
          width="100%"
          height="800"
          frameBorder="0"
          style={{ border: "none", borderRadius: "8px" }}
          title="Booking Form"
        />
      </div>
    </section>
  );
}
