import { useEffect, useState } from "react";

// A live-presence indicator with no backend. It seeds a small count and then
// takes gentle ±1 random-walk steps on an irregular timer, which reads as
// organic traffic rather than a number that flickers randomly every tick.
const LiveViewers = () => {
  const [count, setCount] = useState(() => 2 + Math.floor(Math.random() * 4)); // 2–5

  useEffect(() => {
    let timer;
    const tick = () => {
      setCount((c) => {
        const step = Math.random() < 0.5 ? -1 : 1;
        // Keep it in a believable 1–7 band, biased toward staying put.
        if (Math.random() < 0.45) return c;
        return Math.min(7, Math.max(1, c + step));
      });
      timer = setTimeout(tick, 6000 + Math.random() * 6000); // 6–12s
    };
    timer = setTimeout(tick, 6000 + Math.random() * 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5" title="People viewing right now">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="tabular-nums text-emerald-500">{count}</span>
      <span className="text-neutral-500">viewing now</span>
    </span>
  );
};

export default LiveViewers;
