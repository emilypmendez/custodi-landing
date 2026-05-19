import { motion } from "framer-motion";
import { Shield, Lock, Cpu, Wallet, Eye, FileCheck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "AI Safety Enforcement",
    description:
      "Every transaction is evaluated by a local AI Safety Agent. A RED verdict blocks execution — no override exists. Safety is structural, not optional.",
    tags: ["On-device ML", "Trust graph scoring", "Cooling off periods"],
    highlight: false,
  },
  {
    icon: Lock,
    title: "Local-First Privacy",
    description:
      "Your Personal Safety Agent runs entirely on your device. No remote scoring, no external API calls during evaluation, no data leaves your machine.",
    tags: ["No remote scoring", "No network until cleared", "Runs on your machine"],
    highlight: false,
  },
  {
    icon: Cpu,
    title: "Modular Agent Architecture",
    description:
      "10 specialized AI agents with strict separation of concern. Every request flows through the Orchestrator with append-only ledger state.",
    tags: ["Structured pipeline", "Orchestrator routing", "Append-only ledger"],
    highlight: false,
  },
  {
    icon: FileCheck,
    title: "Explainable Verdicts",
    description:
      "No opaque risk scores. Every GREEN, AMBER, or RED decision includes structured reasoning derived from five behavioral signals. Fully traceable.",
    tags: ["Trust graph integrity", "Amount anomaly", "AML screening"],
    highlight: false,
  },
  {
    icon: Wallet,
    title: "Secure Wallet Execution",
    description:
      "USDC wallet execution with keys stored in encrypted vaults. Pre-approval gates and idempotent design ensure safe financial operations.",
    tags: ["Encrypted key storage", "Pre-approve pattern", "Idempotent design"],
    highlight: false,
  },
  {
    icon: Eye,
    title: "Zero-Knowledge Transfers",
    description:
      "Privacy-preserving transfer wrapper for approved sends. Activated only after safety clearance. Revenue-neutral safety — privacy without compromise.",
    tags: ["ZK proofs", "Post-verdict activation", "Revenue neutral"],
    highlight: true,
  },
];

const FeaturesSection = () => {
  return (
    <section className="border-t border-[color:var(--border)] py-24">
      <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            SAFETY IS STRUCTURAL
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Safety is enforced, not suggested.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            Built for individuals managing personal finances and businesses governing organizational spend.
            Every layer is designed to protect your financial privacy.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ icon: Icon, title, description, tags, highlight }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={`rounded-xl border p-6 transition-all hover:shadow-lg hover:shadow-[rgba(201,168,76,.04)] ${
                highlight
                  ? "border-[rgba(201,168,76,.45)] bg-[rgba(201,168,76,.04)]"
                  : "border-[color:var(--border)] bg-[#1e1e1ecc] hover:border-[rgba(201,168,76,.25)]"
              }`}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(201,168,76,.10)]">
                <Icon className="h-5 w-5 text-[color:var(--custodi-gold)]" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-[color:var(--off-white)]">{title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-[color:var(--mid)]">{description}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--border)] bg-[#14141466] px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-[color:var(--mid)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
