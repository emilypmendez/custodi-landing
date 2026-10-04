import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const faqs = [
  {
    q: "What is Custodi?",
    a: "Custodi is a desktop application for individuals and businesses that connects your external financial accounts, displays all your financial details in one place, and enforces military-grade encryption and AI-governed safety on every transaction — locally, on your machine. No data leaves your device.",
  },
  {
    q: "Why is Custodi a desktop app and not a web app?",
    a: "Security features like OS-level key vaults, offline-first data caching, and local AI evaluation are only possible in a native desktop environment. A browser tab cannot isolate credentials from other apps, cannot run AI evaluation without a server, and cannot guarantee zero data exfiltration. Custodi is a desktop application by design.",
  },
  {
    q: "How does the Safety Agent work?",
    a: "The Personal Safety Agent runs entirely on your device. Before any transaction can be broadcast, it evaluates five behavioral signals: trust graph integrity, amount anomaly, 14-day rolling baseline, AML velocity screening, and social engineering detection — all locally with no external API calls.",
  },
  {
    q: "Can a RED verdict be overridden?",
    a: "No. There is no path from a RED verdict to execution. The transaction is blocked with no override path. Social engineering, anomalous amounts, or AML flags trigger a hard stop. Safety is enforced at the orchestration layer — not at the interface.",
  },
  {
    q: "What happens with an AMBER verdict?",
    a: "AMBER enforces a mandatory cooling-off period. The transaction is paused and you must reconfirm after the timer completes. This protects against pressure or impulsive decisions. You cannot skip the timer.",
  },
  {
    q: "How are my credentials and keys stored?",
    a: "All credentials and private keys are stored in a Tauri Stronghold vault — an OS-level encrypted store isolated from the filesystem, inaccessible to other apps, and never written to unprotected disk. Keys are never exposed in memory beyond their immediate use.",
  },
  {
    q: "Does Custodi send any data to external servers?",
    a: "No financial data ever leaves your machine. There are no telemetry calls, no remote logging, and no server-side storage of your account information. Safety evaluation runs entirely on-device. Network access only happens when you initiate a sync or broadcast a cleared transaction.",
  },
  {
    q: "Which platforms does Custodi support?",
    a: "Custodi is available for macOS, Windows, and Linux.",
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
