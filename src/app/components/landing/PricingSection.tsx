import { Button } from "@/app/components/ui/button";

const plans = [
  {
    name: "FREE",
    price: "$0",
    fee: "2.99% processing fee per transaction",
    features: [
      "Safety Agent enforcement",
      "Public transfers",
      "Explainable verdicts",
    ],
    highlighted: false,
  },
  {
    name: "PRO",
    price: "$20/mo",
    fee: "2.99% processing fee per transaction",
    features: [
      "Private transfers via Unlink",
      "AMBER cooling off protection",
      "Priority updates",
    ],
    highlighted: true,
  },
  {
    name: "BUSINESS",
    price: "$50/mo",
    fee: "2.99% processing fee per transaction",
    features: [
      "Multi-sig approvals",
      "Admin-level risk thresholds",
      "Audit exports",
      "Managed recovery (coming soon)",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="border-t border-[color:var(--border)] py-24">
      <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            PRICING
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Transparent plans.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            The Safety Agent remains mandatory across all tiers. Plans affect privacy and governance capabilities.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-5 sm:p-8 transition-transform duration-300 ease-out hover:scale-105 ${
                plan.highlighted
                  ? "border-[rgba(255,255,255,.25)] bg-[linear-gradient(180deg,rgba(201,168,76,.10),transparent_70%),#1e1e1e] shadow-[0_0_40px_rgba(255,255,255,.15)]"
                  : "border-[rgba(201,168,76,.35)] bg-[#1e1e1ecc] shadow-[0_0_40px_rgba(201,168,76,.20)]"
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
                {plan.name}
              </span>
              <div className="mt-6 text-4xl font-semibold text-[color:var(--off-white)]">
                {plan.price.includes("/") ? (
                  <>
                    {plan.price.split("/")[0]}
                    <span className="text-base font-normal text-[color:var(--mid)]">/{plan.price.split("/")[1]}</span>
                  </>
                ) : (
                  plan.price
                )}
              </div>
              <p className="mt-2 text-sm text-[color:var(--mid)]">{plan.fee}</p>
              <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[color:var(--custodi-gold)]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full rounded-xl px-4 py-3 text-sm font-semibold ${
                  plan.highlighted
                    ? "bg-[color:var(--custodi-gold)] text-[color:var(--custodi-dark)] hover:bg-[#d4b85c]"
                    : "border border-[color:var(--border)] bg-[#1e1e1e] text-[color:var(--off-white)] hover:bg-[#2a2a2a]"
                }`}
              >
                <a href="https://forms.gle/7oQbghFgYigpJPZW9" target="_blank">Request early access →</a>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[color:var(--mid)]">
          Safety decisions are revenue neutral.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
