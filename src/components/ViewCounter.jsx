import { useEffect, useState } from "react";

// Real cumulative page-view count via Abacus (no signup, no key). One hit is
// counted per load; if the service is unreachable we simply render nothing so
// the footer never shows a fake number.
const ENDPOINT = "https://abacus.jasoncameron.dev/hit/mohithkodavati/home";

const ViewCounter = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(ENDPOINT)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d?.value === "number") setCount(d.value);
      })
      .catch(() => {/* offline / blocked — show nothing */});
    return () => { cancelled = true; };
  }, []);

  if (count === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5" title="Total page views">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="tabular-nums text-emerald-500">{count.toLocaleString()}</span>
      <span className="text-neutral-500">views</span>
    </span>
  );
};

export default ViewCounter;
