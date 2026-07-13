import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeader from "../SectionHeader";

// Rough normal CDF (Abramowitz-Stegun erf) to estimate a playful percentile.
const normalCdf = (x, mean, sd) => {
  const z = (x - mean) / (sd * Math.SQRT2);
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t +
      0.254829592) *
      t *
      Math.exp(-z * z);
  const erf = z >= 0 ? y : -y;
  return 0.5 * (1 + erf);
};

// Share of people slower than you (mean simple reaction ≈ 273ms, sd ≈ 60).
const fasterThan = (ms) => Math.round((1 - normalCdf(ms, 273, 60)) * 100);

const STATES = {
  idle: {
    box: "border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900",
    text: "text-neutral-500",
  },
  waiting: {
    box: "border-amber-400 bg-amber-50 dark:border-amber-500/50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
  },
  ready: {
    box: "border-emerald-500 bg-emerald-500 cursor-pointer",
    text: "text-white",
  },
  early: {
    box: "border-red-400 bg-red-50 dark:border-red-500/50 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
  },
  result: {
    box: "border-accent bg-accent/10 cursor-pointer",
    text: "text-accent",
  },
};

const ChallengeSection = () => {
  const [phase, setPhase] = useState("idle");
  const [ms, setMs] = useState(null);
  const [best, setBest] = useState(null);
  const [times, setTimes] = useState([]);
  const timeoutRef = useRef(null);
  const readyAtRef = useRef(0);

  useEffect(() => {
    const stored = Number(localStorage.getItem("reaction-best"));
    if (stored) setBest(stored);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const arm = useCallback(() => {
    setPhase("waiting");
    setMs(null);
    const delay = 1200 + Math.random() * 2600; // 1.2–3.8s
    timeoutRef.current = setTimeout(() => {
      readyAtRef.current = performance.now();
      setPhase("ready");
    }, delay);
  }, []);

  const handleClick = () => {
    if (phase === "idle" || phase === "early" || phase === "result") {
      arm();
    } else if (phase === "waiting") {
      clearTimeout(timeoutRef.current);
      setPhase("early");
    } else if (phase === "ready") {
      const elapsed = Math.round(performance.now() - readyAtRef.current);
      setMs(elapsed);
      setTimes((t) => [...t, elapsed]);
      setBest((b) => {
        const next = b ? Math.min(b, elapsed) : elapsed;
        localStorage.setItem("reaction-best", String(next));
        return next;
      });
      setPhase("result");
    }
  };

  const avg = times.length
    ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
    : null;

  const label = {
    idle: "click to start",
    waiting: "wait for green…",
    ready: "CLICK!",
    early: "too soon — click to retry",
    result: `${ms} ms`,
  }[phase];

  const s = STATES[phase];

  return (
    <section id="challenge" className="scroll-mt-24 py-14">
      <SectionHeader num="04" title="CHALLENGE" />
      <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        Test my reflexes — or yours. Click <span className="text-accent">start</span>, wait for the
        box to turn green, then click as fast as you can. (I like to think my turnaround time is
        about this quick.)
      </p>

      <div className="rounded-lg border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
        <button
          onClick={handleClick}
          className={`flex h-48 w-full flex-col items-center justify-center rounded-lg border-2 transition-colors ${s.box}`}
          aria-label="Reaction test area"
        >
          <span className={`text-2xl font-bold ${s.text}`}>{label}</span>
          {phase === "result" && (
            <span className="mt-2 text-sm text-neutral-500">
              faster than ~{Math.max(1, Math.min(99, fasterThan(ms)))}% of people · click to go again
            </span>
          )}
          {phase === "ready" && (
            <span className="mt-2 text-sm text-white/80">now!</span>
          )}
        </button>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex gap-8">
            <div>
              <div className="text-xl font-bold text-accent">{best ? `${best} ms` : "—"}</div>
              <div className="text-xs text-neutral-500">your best</div>
            </div>
            <div>
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {avg ? `${avg} ms` : "—"}
              </div>
              <div className="text-xs text-neutral-500">your avg</div>
            </div>
            <div>
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {times.length}
              </div>
              <div className="text-xs text-neutral-500">attempts</div>
            </div>
          </div>
          {times.length > 0 && (
            <button
              onClick={() => {
                setTimes([]);
                setPhase("idle");
                setMs(null);
              }}
              className="rounded border border-neutral-300 px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-400"
            >
              reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
