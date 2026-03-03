import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroMockup from "@/assets/hero-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center gap-12 px-4 py-20 lg:flex-row lg:gap-16 lg:py-0">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-1 flex-col justify-center"
        >
          <div className="mb-6 flex flex-wrap gap-3">
            {["AI GOVERNED EXECUTION", "MANDATORY SAFETY", "LOCAL BY DESIGN"].map(
              (tag) => (
                <span key={tag} className="section-label rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
                  {tag}
                </span>
              )
            )}
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Privacy is a human right.{" "}
            <span className="gradient-gold">Protection is a responsibility.</span>
          </h1>

          <p className="mb-8 max-w-lg text-lg text-muted-foreground">
            Custodi is an AI governed financial execution platform where safety is
            mandatory and privacy is preserved. Every transaction is evaluated
            before it can be executed. There is no bypass.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-gold-light">
              Request Early Access →
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            No spam. Just release updates and early access instructions.
          </p>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-1 items-center justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-3xl" />
            <img
              src={heroMockup}
              alt="Custodi safety evaluation dashboard"
              className="relative z-10 w-full max-w-[600px] rounded-2xl border border-border shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
