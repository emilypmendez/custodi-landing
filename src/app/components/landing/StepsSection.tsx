const steps = [
  {
    number: "01",
    title: "Request Early Access",
    description:
      "Join the waitlist for individual early access. No spam — just release updates and access instructions.",
  },
  {
    number: "02",
    title: "Install Custodi",
    description:
      "Download the desktop app built on Tauri. Your Safety Agent runs locally from day one.",
  },
  {
    number: "03",
    title: "Execute with Confidence",
    description:
      "Every transaction is evaluated by your local AI agent. Safety is mandatory. Privacy is preserved.",
  },
];

const StepsSection = () => {
  return (
    <section className="py-24">
      <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            GETTING STARTED
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Start in minutes.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            Three steps to governed financial execution.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-8 text-center"
            >
              <div className="mb-4 font-mono text-3xl font-bold text-[color:var(--custodi-gold)]">
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[color:var(--off-white)]">{step.title}</h3>
              <p className="text-sm text-[color:var(--mid)]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
