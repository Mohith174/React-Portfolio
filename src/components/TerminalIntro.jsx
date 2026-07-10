import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { prompt: "$ whoami", output: "Mohith Kodavati" },
  { prompt: "$ cat role.txt", output: "Python-first, AI-native SWE: agentic systems, Spring Boot" },
  { prompt: "$ status --check", output: "Open to roles. Based in Dallas, open to relocate/remote." },
];

// Types out a fake terminal session line by line, then blinks a cursor.
const TerminalIntro = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState("prompt"); // "prompt" -> "output" -> next line

  useEffect(() => {
    if (lineIndex >= LINES.length) return;
    const current = LINES[lineIndex];
    const text = phase === "prompt" ? current.prompt : current.output;

    if (charIndex < text.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), phase === "prompt" ? 35 : 12);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      if (phase === "prompt") {
        setPhase("output");
        setCharIndex(0);
      } else {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
        setPhase("prompt");
      }
    }, phase === "prompt" ? 200 : 500);
    return () => clearTimeout(t);
  }, [charIndex, phase, lineIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xl rounded-xl border border-neutral-800 bg-neutral-950 font-mono text-sm shadow-2xl shadow-purple-500/10"
    >
      <div className="flex items-center gap-1.5 border-b border-neutral-800 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-neutral-500">mohith@portfolio</span>
      </div>
      <div className="min-h-[9.5rem] space-y-2 p-5">
        {LINES.slice(0, lineIndex).map((l, i) => (
          <div key={i}>
            <div className="text-cyan-400">{l.prompt}</div>
            <div className="pl-2 text-neutral-300">{l.output}</div>
          </div>
        ))}
        {lineIndex < LINES.length && (
          <div>
            <div className="text-cyan-400">
              {phase === "prompt" ? LINES[lineIndex].prompt.slice(0, charIndex) : LINES[lineIndex].prompt}
              {phase === "prompt" && <span className="animate-pulse">▌</span>}
            </div>
            {phase === "output" && (
              <div className="pl-2 text-neutral-300">
                {LINES[lineIndex].output.slice(0, charIndex)}
                <span className="animate-pulse">▌</span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TerminalIntro;
