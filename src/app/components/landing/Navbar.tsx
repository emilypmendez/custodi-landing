import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2">
          <svg className="h-[22px] w-[22px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21V2Z" fill="rgba(201,168,76,0.25)"/>
            <path d="M11 2L20 5.5V12C2 16.5 6 19.5 11 21C6 19.5 2 16.5 2 12V5.5L11 2Z" stroke="var(--custodi-gold)" strokeWidth="0.8" fill="none"/>
            <path d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21L11 2Z" stroke="var(--custodi-gold)" strokeWidth="0.6" fill="none"/>
            <path d="M2.25 14 Q2 7.5 20 5.5" stroke="var(--custodi-gold)" strokeWidth="0.9" fill="none"/>
          </svg>
          <span className="font-mono text-lg font-semibold tracking-wide text-foreground">
            CUSTODI
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-gold-light">
            Request Early Access →
          </Button>
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-border bg-background md:hidden"
        >
          <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-gold-light w-fit">
              Request Early Access →
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
