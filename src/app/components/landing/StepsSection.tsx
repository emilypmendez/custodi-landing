import Link from "next/link";
import PlatformBadges from "./PlatformBadges";

const steps = [
  {
    number: "01",
    title: "Download Custodi",
    description:
      "Install the desktop app on your Mac, Windows, or Linux machine. Setup takes under two minutes. Your Safety Agent activates immediately — locally, with no cloud dependency.",
    tags: [],
    platforms: true,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3v10M6 9l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Link Your Accounts",
    description:
      "Connect your banks, wallets, and financial services using encrypted, read-permissioned integrations. Custodi never stores your credentials — only encrypted tokens stay on your device.",
    tags: ["Bank-grade OAuth", "AES-256 encrypted tokens"],
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10h6M4 7l3 3-3 3M16 7l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Manage Your Finances",
    description:
      "View every balance, transaction, and account in one unified dashboard. Execute transfers with Custodi standing guard — every action evaluated, every decision explained, every key protected.",
    tags: ["Unified dashboard", "Safety-gated execution"],
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 14l4-5 4 3 3-5 3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

const StepsSection = () => {
  return (
    <section className="py-24">
      <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            HOW IT WORKS
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Up and running in three steps.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            From download to full financial oversight — in minutes.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-8"
            >
              {/* Number + icon row */}
              <div className="mb-6 flex items-start justify-between">
                <span className="font-mono text-3xl font-bold text-[rgba(201,168,76,.45)]">{step.number}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(201,168,76,.10)] text-[color:var(--custodi-gold)]">
                  {step.icon}
                </div>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-[color:var(--off-white)]">{step.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-[color:var(--mid)]">{step.description}</p>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {"platforms" in step && step.platforms && <PlatformBadges variant="pill" />}
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--border)] bg-[#14141466] px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-[color:var(--mid)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <Link
            href="https://forms.gle/7oQbghFgYigpJPZW9"
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg bg-[color:var(--custodi-gold)] px-6 py-3 text-sm font-semibold text-[color:var(--custodi-dark)] transition-colors hover:bg-[#d4b85c]"
          >
            Request Early Access →
          </Link>
          <p className="text-xs text-[color:var(--mid)]">
            No spam. Just release updates and early access instructions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
