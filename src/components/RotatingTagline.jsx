import { useEffect, useRef, useState } from "react";

// A terminal-style typewriter that types a phrase, holds, deletes, and moves
// to the next — cycling forever. Falls back to a static phrase if the user
// prefers reduced motion.
const RotatingTagline = ({ phrases }) => {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduced.current) {
      setText(phrases[0]);
      return;
    }
    const full = phrases[idx];
    let delay = deleting ? 45 : 75;

    if (!deleting && text === full) {
      delay = 1600; // hold at full phrase
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
      delay = 350;
    }

    const t = setTimeout(() => {
      setText((cur) =>
        deleting ? cur.slice(0, -1) : full.slice(0, cur.length + 1)
      );
      if (!deleting && text === full) setDeleting(true);
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, idx, phrases]);

  return (
    <p className="mt-4 h-5 text-sm text-accent">
      <span className="text-neutral-400">$ </span>
      {text}
      <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" aria-hidden />
    </p>
  );
};

export default RotatingTagline;
