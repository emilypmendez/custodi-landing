"use client";

import { useMemo, useState } from "react";
import { isValidEmail } from "@/lib/validators";

export default function EarlyAccessForm({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const canSubmit = useMemo(() => isValidEmail(email) && status !== "loading", [email, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");

      setStatus("success");
      setMessage("You’re in. We’ll email you when early access opens.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Could not submit. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (individual access)"
          className="w-full rounded-xl border border-[color:var(--border)] bg-[#14141466] px-4 py-3 text-[color:var(--off-white)] outline-none focus:border-[color:var(--custodi-gold)]"
          aria-label="Email address"
          inputMode="email"
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-xl bg-[color:var(--custodi-gold)] px-5 py-3 font-semibold text-[color:var(--custodi-dark)] disabled:opacity-50"
        >
          Request early access →
        </button>
      </div>

      {message ? (
        <p
          className={`mt-3 text-sm ${
            status === "success"
              ? "text-[color:var(--green)]"
              : status === "error"
              ? "text-[color:var(--red)]"
              : "text-[color:var(--mid)]"
          }`}
        >
          {message}
        </p>
      ) : (
        <p className="mt-3 text-sm text-[color:var(--mid)]">
          No spam. Just release updates and early access instructions.
        </p>
      )}
    </form>
  );
}