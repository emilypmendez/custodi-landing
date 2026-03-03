import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const faqs = [
  {
    q: "What is Custodi?",
    a: "Custodi is an AI governed financial execution platform where safety is mandatory and privacy is preserved. Every transaction is evaluated by a local AI agent before it can be executed.",
  },
  {
    q: "How does the Safety Agent work?",
    a: "The Personal Safety Agent runs entirely on your device using on-device ML. It evaluates behavioral signals, trust graph integrity, transaction anomalies, and AML velocity — all locally with no external API calls.",
  },
  {
    q: "Can a RED verdict be overridden?",
    a: "No. There is no path from a RED verdict to execution. Safety is enforced at the orchestration layer, not at the interface. No bypass, no override, deterministic gates.",
  },
  {
    q: "What happens with an AMBER verdict?",
    a: "AMBER enforces a mandatory cooling-off period (currently 30 seconds). The timer must complete before execution can proceed. This protects against impulsive or coerced transactions.",
  },
  {
    q: "Is my data sent to external servers?",
    a: "No. The safety evaluation runs entirely on your machine. No remote behavioral scoring, no external API calls during evaluation, no local HTTP exposure, and no network broadcast until execution is cleared.",
  },
  {
    q: "What currencies and chains are supported?",
    a: "Custodi currently supports USDC execution on Base L2 and Monad. Fiat rails and additional chains are on the roadmap.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="border-t border-[color:var(--border)] bg-[#1a1a1a] py-24">
      <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Common questions.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            Everything you need to know about Custodi.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-[color:var(--border)] bg-[#1e1e1e] px-6"
              >
                <AccordionTrigger className="text-left text-[15px] font-semibold text-[color:var(--custodi-gold)] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-[rgba(244,244,244,.75)]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
