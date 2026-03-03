import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden border-t border-border py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label mb-4 block">Vision</span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Building toward governed financial infrastructure.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Custodi is evolving into a managed financial environment with identity-backed recovery,
            policy-based execution, multi-sig business governance, and integrated fiat rails.
            Safety will remain mandatory.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-gold-light">
            Request Early Access →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
