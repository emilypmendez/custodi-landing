import SafetyScreenshots from "../assets/SafetyScreenshots";

const DemoSection = () => {
  return (
    <section className="border-y border-[color:var(--border)] py-24">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
            <div className="mb-16 text-center">
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
                SAFETY IN ACTION
            </span>
            <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
                Verdicts are clear.
            </h2>
            <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
                Every verdict includes structured reasoning from five behavioral signals. Fully traceable.
            </p>
            <br/>
            <SafetyScreenshots />
            </div>
        </div>
    </section>
  );
};

export default DemoSection;
