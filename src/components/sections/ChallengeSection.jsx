import { useCallback, useEffect, useMemo, useState } from "react";
import SectionHeader from "../SectionHeader";

// --- stats helpers -------------------------------------------------------

// Standard normal via Box–Muller.
const randNormal = () => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const pearson = (pts) => {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p.x, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  let num = 0;
  let dx = 0;
  let dy = 0;
  pts.forEach((p) => {
    num += (p.x - mx) * (p.y - my);
    dx += (p.x - mx) ** 2;
    dy += (p.y - my) ** 2;
  });
  return num / Math.sqrt(dx * dy || 1);
};

const clampR = (r) => Math.max(-0.95, Math.min(0.95, r));

// Build one round: 45 points with a known target correlation, plus 3 options.
const makeRound = () => {
  const target = clampR((0.15 + Math.random() * 0.8) * (Math.random() < 0.5 ? -1 : 1));
  const pts = Array.from({ length: 45 }, () => {
    const z1 = randNormal();
    const z2 = randNormal();
    return { x: z1, y: target * z1 + Math.sqrt(1 - target * target) * z2 };
  });

  const actual = pearson(pts);
  const base = Math.round(actual * 10) / 10; // nearest 0.1
  const delta = 0.3 + Math.random() * 0.2;
  const raw = [base, clampR(base + delta), clampR(base - delta)]
    .map((v) => Math.round(v * 10) / 10);

  // De-duplicate while keeping three distinct choices.
  const options = [];
  raw.forEach((v) => {
    if (!options.some((o) => Math.abs(o - v) < 0.05)) options.push(v);
  });
  while (options.length < 3) {
    const cand = Math.round(clampR(base + (Math.random() - 0.5) * 1.4) * 10) / 10;
    if (!options.some((o) => Math.abs(o - cand) < 0.05)) options.push(cand);
  }

  // The correct option is whichever is closest to the true r.
  const correct = options.reduce((best, o) =>
    Math.abs(o - actual) < Math.abs(best - actual) ? o : best
  );

  return {
    pts,
    actual,
    options: options.sort((a, b) => a - b),
    correct,
  };
};

// --- scatter plot --------------------------------------------------------

const Scatter = ({ pts }) => {
  const W = 320;
  const H = 220;
  const pad = 16;
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const sx = (x) => pad + ((x - minX) / (maxX - minX || 1)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - minY) / (maxY - minY || 1)) * (H - 2 * pad);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md" role="img" aria-label="Scatter plot">
      <rect x="0" y="0" width={W} height={H} className="fill-neutral-100 dark:fill-neutral-900" rx="8" />
      <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
      <line x1={pad} y1={pad} x2={pad} y2={H - pad} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
      {pts.map((p, i) => (
        <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r="3" className="fill-accent" opacity="0.75" />
      ))}
    </svg>
  );
};

// --- section -------------------------------------------------------------

const fmt = (r) => (r > 0 ? "+" : "") + r.toFixed(2);

const ChallengeSection = () => {
  const [round, setRound] = useState(null);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState({ hits: 0, total: 0 });

  const newRound = useCallback(() => {
    setPicked(null);
    setRound(makeRound());
  }, []);

  useEffect(() => {
    newRound();
  }, [newRound]);

  const isCorrect = picked !== null && round && picked === round.correct;

  const choose = (opt) => {
    if (picked !== null || !round) return;
    setPicked(opt);
    setScore((s) => ({
      hits: s.hits + (opt === round.correct ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const accuracy = useMemo(
    () => (score.total ? Math.round((score.hits / score.total) * 100) : 0),
    [score]
  );

  if (!round) return <section id="challenge" className="scroll-mt-24 py-16" />;

  return (
    <section id="challenge" className="scroll-mt-24 py-16">
      <SectionHeader num="04" title="CHALLENGE" />
      <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        A little data-science game. Eyeball the scatter plot and guess its correlation
        coefficient <span className="text-accent">r</span>. I&rsquo;ll reveal the real number —
        it&rsquo;s computed live from the points, no cheating.
      </p>

      <div className="rounded-lg border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <Scatter pts={round.pts} />

          <div className="w-full flex-1">
            <p className="mb-3 text-xs tracking-wider text-neutral-500">GUESS THE CORRELATION</p>
            <div className="flex flex-wrap gap-2">
              {round.options.map((opt) => {
                const revealed = picked !== null;
                const isThisCorrect = opt === round.correct;
                const isThisPicked = opt === picked;
                let cls =
                  "border-neutral-300 text-neutral-700 hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-300";
                if (revealed && isThisCorrect) cls = "border-emerald-500 text-emerald-500";
                else if (revealed && isThisPicked) cls = "border-red-500 text-red-500";
                else if (revealed) cls = "border-neutral-200 text-neutral-400 dark:border-neutral-800";
                return (
                  <button
                    key={opt}
                    onClick={() => choose(opt)}
                    disabled={revealed}
                    className={`rounded border px-4 py-2 text-sm transition-colors disabled:cursor-default ${cls}`}
                  >
                    {fmt(opt)}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 min-h-[3.5rem] text-sm">
              {picked !== null && (
                <div className="space-y-1">
                  <p className={isCorrect ? "text-emerald-500" : "text-red-500"}>
                    {isCorrect ? "> correct." : "> not quite."} actual r = {fmt(round.actual)}
                  </p>
                  <p className="text-neutral-500">
                    {Math.abs(round.actual) > 0.7
                      ? "a strong relationship — points hug a clear line."
                      : Math.abs(round.actual) > 0.4
                      ? "a moderate relationship — trend visible through the noise."
                      : "a weak relationship — mostly scatter."}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                score {score.hits}/{score.total}
                {score.total > 0 && ` · ${accuracy}%`}
              </span>
              <button
                onClick={newRound}
                className="rounded border border-neutral-300 px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-400"
              >
                {picked !== null ? "next round →" : "new plot"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
