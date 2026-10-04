import { Button } from "@/app/components/ui/button";

const plans = [
  {
    name: "FREE",
    price: "$0",
    fees: ["2.99% processing fee per transaction"],
    features: [
      "Safety Agent enforcement",
      "Public transfers",
      "Explainable verdicts",
      "Single wallet",
    ],
    highlighted: false,
  },
  {
    name: "PROFESSIONAL",
    price: "$2,500/year",
    fees: [
      "2.99% processing fee per transaction",
      "$600/year maintenance for software updates",
    ],
    features: [
      "Private transfers via Unlink",
      "Import contacts",
      "Trusted contacts list",
      "Transaction history & verdict log",
      "Custom alerts",
      "Spending insights",
      "Priority updates",
      "Priority support",
      "Multi-wallet support",
    ],
    highlighted: true,
  },
  {
    name: "ENTERPRISE",
    price: "$5,000/seat/year",
    fees: [
      "2.99% processing fee per transaction",
      "$600/year maintenance for software updates",
    ],
    features: [
      "Multi-sig approvals",
      "Admin-level risk thresholds",
      "Compliance-ready audit exports",
      "Team governance controls",
      "Role-based access",
      "SSO / SAML login (coming soon)",
      "Shared contacts directory (coming soon)",
      "Dedicated account manager & SLA (coming soon)",
      "Custom onboarding (coming soon)",
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
            Choose the right fit for your needs — individual or business.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-5 sm:p-8 transition-transform duration-300 ease-out hover:scale-105 ${
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
                    {plan.price.slice(0, plan.price.indexOf("/"))}
                    <span className="text-base font-normal text-[color:var(--mid)]">{plan.price.slice(plan.price.indexOf("/"))}</span>
                  </>
                ) : (
                  plan.price
                )}
              </div>
              <ul className="mt-2 space-y-1 text-sm text-[color:var(--mid)]">
                {plan.fees.map((fee) => (
                  <li key={fee}>{fee}</li>
                ))}
              </ul>
              <ul className="mt-6 mb-8 space-y-3 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[color:var(--custodi-gold)]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-auto w-full rounded-xl px-4 py-3 text-sm font-semibold ${
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
