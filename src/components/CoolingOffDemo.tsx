"use client";

import { useEffect, useMemo, useState } from "react";

export default function CoolingOffDemo({ seconds = 30 }: { seconds?: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) return;

    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [remaining, running]);

  const locked = remaining > 0;

  const label = useMemo(() => {
    if (!running) return "Paused";
    if (locked) return `Cooling off: ${remaining}s`;
    return "Execution cleared";
  }, [locked, remaining, running]);

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[11px] tracking-[0.20em] text-[color:var(--mid)]">
            AMBER COOLING OFF
          </div>
          <h4 className="mt-2 text-lg font-semibold">Mandatory delay before execution</h4>
          <p className="mt-1 text-sm text-[color:var(--mid)]">
            For flagged transactions, Custodi enforces a brief pause. The timer is currently fixed at 30 seconds.
          </p>
        </div>

        <span className="rounded-full border border-[rgba(212,145,45,.30)] bg-[rgba(212,145,45,.10)] px-3 py-1 font-mono text-[11px] tracking-[0.20em] text-[color:var(--amber)]">
          AMBER
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="rounded-xl border border-[color:var(--border)] bg-[#14141466] px-4 py-3 font-semibold text-[color:var(--custodi-gold)]"
          onClick={() => {
            setRemaining(seconds);
            setRunning(true);
          }}
        >
          Reset {seconds}s
        </button>

        <button
          type="button"
          disabled={locked}
          className="rounded-xl bg-[#14141499] px-4 py-3 font-semibold text-[color:var(--mid)] disabled:opacity-70"
          title={locked ? "Execution remains gated until the timer completes." : "Execution cleared."}
        >
          {label}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3 text-sm text-[color:var(--mid)]">
        <button
          type="button"
          className="underline decoration-[rgba(201,168,76,.35)] underline-offset-4"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "Pause" : "Resume"}
        </button>
        <span className="font-mono">{locked ? `${remaining}s remaining` : "Unlocked"}</span>
      </div>
    </div>
  );
}