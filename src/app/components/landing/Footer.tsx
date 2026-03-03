import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/20 py-12">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm font-semibold tracking-wide text-foreground">
            CUSTODI
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          AI governed financial execution. Safety is mandatory.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Custodi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
