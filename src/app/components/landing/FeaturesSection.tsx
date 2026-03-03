import { motion } from "framer-motion";
import { Shield, Lock, Cpu, Wallet, Eye, FileCheck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Personal Safety Agent",
    description: "On-device ML evaluation with trust graph, social engineering detection, and mandatory cooling off periods.",
    bullets: [
      "No remote behavioral scoring",
      "No external API calls during evaluation",
      "No network broadcast until cleared",
      "Runs entirely on your machine",
    ],
  },
  {
    icon: Lock,
    title: "Execution Guarantee",
    description: "Safety is enforced at the orchestration layer, not at the interface. A RED verdict blocks all downstream execution.",
    bullets: [
      "GREEN proceeds",
      "AMBER pauses with cooling off",
      "RED blocks — no bypass exists",
      "Deterministic gate enforcement",
    ],
  },
  {
    icon: Cpu,
    title: "Agent Architecture",
    description: "Modular AI agents with strict separation of concern. Every request begins and ends with the Orchestrator.",
    bullets: [
      "10 specialized AI agents",
      "Append-only ledger state",
      "Structured execution pipeline",
      "Orchestrator routing logic",
    ],
  },
  {
    icon: Wallet,
    title: "Wallet Execution",
    description: "USDC wallet execution on Base L2 and Monad. Keys stored in Tauri Stronghold with pre-approval gates.",
    bullets: [
      "Base L2 and Monad support",
      "Tauri Stronghold key storage",
      "Idempotent by design",
      "Pre-approve + rail pattern",
    ],
  },
  {
    icon: Eye,
    title: "Unlink Privacy",
    description: "ZK private transfer wrapper for approved USDC sends. Activated only after GREEN or AMBER post-timer.",
    bullets: [
      "Zero-knowledge proofs",
      "Privacy preserving transfers",
      "Activated post-verdict only",
      "Revenue neutral safety",
    ],
  },
  {
    icon: FileCheck,
    title: "Explainable Verdicts",
    description: "Every GREEN, AMBER, or RED decision includes structured reasoning derived from five behavioral signals.",
    bullets: [
      "Trust graph integrity",
      "Transaction amount anomaly",
      "14-day rolling baseline",
      "AML velocity screening",
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-label mb-4 block">Safety is Structural</span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Safety is enforced, not suggested.
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Before any transfer is broadcast: behavioral signals are evaluated, risk and compliance checks run, execution is gated by orchestration, and ledger state is recorded.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{feature.description}</p>
              <ul className="space-y-2">
                {feature.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
