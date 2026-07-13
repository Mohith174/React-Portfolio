import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SECTIONS } from "../data/nav";
import { PROJECTS } from "../data/projects";
import { PROFILE } from "../data/profile";

// Flatten everything navigable into one searchable command list.
const buildCommands = () => {
  const sections = SECTIONS.map((s) => ({
    id: `section-${s.id}`,
    label: s.label.charAt(0) + s.label.slice(1).toLowerCase(),
    hint: "section",
    type: "section",
    target: s.id,
  }));
  const projects = PROJECTS.map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
    hint: "project",
    type: "project",
    target: p.slug,
  }));
  const links = [
    { id: "link-github", label: "GitHub", hint: "external", type: "external", target: PROFILE.links.github },
    { id: "link-linkedin", label: "LinkedIn", hint: "external", type: "external", target: PROFILE.links.linkedin },
    { id: "link-email", label: "Email", hint: "external", type: "external", target: `mailto:${PROFILE.links.email}` },
  ];
  return [...sections, ...projects, ...links];
};

const CommandPalette = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const commands = useMemo(buildCommands, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      // Focus after the element mounts.
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  const run = (cmd) => {
    if (!cmd) return;
    onClose();
    if (cmd.type === "section") {
      // Ensure we're on the home route, then scroll to the section.
      navigate("/");
      requestAnimationFrame(() => {
        document.getElementById(cmd.target)?.scrollIntoView({ behavior: "smooth" });
      });
    } else if (cmd.type === "project") {
      navigate(`/projects/${cmd.target}`);
    } else {
      window.open(cmd.target, cmd.target.startsWith("mailto") ? "_self" : "_blank");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[cursor]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Jump to a section, project, or link…"
          className="w-full border-b border-neutral-200 bg-transparent px-4 py-3.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 dark:border-neutral-800 dark:text-neutral-100"
        />
        <ul className="max-h-72 overflow-y-auto p-1.5">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-neutral-500">No matches.</li>
          )}
          {results.map((cmd, i) => (
            <li key={cmd.id}>
              <button
                onMouseEnter={() => setCursor(i)}
                onClick={() => run(cmd)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  i === cursor
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <span>{cmd.label}</span>
                <span className="text-xs text-neutral-400">{cmd.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 border-t border-neutral-200 px-4 py-2 text-[10px] text-neutral-500 dark:border-neutral-800">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
