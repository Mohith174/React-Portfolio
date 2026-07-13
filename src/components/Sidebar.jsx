import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { TbMusic, TbMusicOff } from "react-icons/tb";
import { PROFILE } from "../data/profile";
import { SECTIONS } from "../data/nav";
import { useTheme } from "../hooks/useTheme";
import { useAmbientAudio } from "../hooks/useAmbientAudio";
import { useScrollSpy } from "../hooks/useScrollSpy";
import CommandPalette from "./CommandPalette";
import avatar from "../assets/profile-pic.jpg";

const SECTION_IDS = SECTIONS.map((s) => s.id);

const LiveClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return <span>{hh}:{mm}:{ss}</span>;
};

const IconControl = ({ onClick, label, children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    title={label}
    className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-400"
  >
    {children}
  </button>
);

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { playing, toggle: toggleAudio } = useAmbientAudio();
  const activeId = useScrollSpy(SECTION_IDS);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const navigate = useNavigate();

  // Global ⌘K / Ctrl+K to open the command palette.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goToSection = (id) => {
    navigate("/");
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <aside className="border-b border-neutral-200 px-6 py-10 dark:border-neutral-800 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-[340px] lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
        {/* Identity */}
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt="Mohith Kodavati"
            className="h-16 w-16 rounded-lg border border-neutral-300 object-cover grayscale dark:border-neutral-700"
          />
          <div className="leading-tight">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {PROFILE.firstName}
            </h1>
            <h1 className="text-2xl font-light tracking-tight text-neutral-500">
              {PROFILE.lastName}
            </h1>
          </div>
        </div>

        <p className="mt-6 break-words text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {PROFILE.title}
        </p>

        <p className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          {PROFILE.status}
          <span className="text-neutral-400">/ {PROFILE.location}</span>
        </p>

        {/* Numbered nav with scroll-spy */}
        <nav className="mt-10 flex flex-col gap-1">
          {SECTIONS.map((s) => {
            const active = activeId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => goToSection(s.id)}
                className="group flex items-center gap-3 py-1.5 text-left text-sm"
              >
                <span className={`text-xs ${active ? "text-accent" : "text-neutral-400"}`}>{s.num}</span>
                <span
                  className={`h-px transition-all ${
                    active ? "w-8 bg-accent" : "w-4 bg-neutral-300 group-hover:w-8 dark:bg-neutral-700"
                  }`}
                />
                <span
                  className={`tracking-wider transition-colors ${
                    active
                      ? "text-neutral-900 dark:text-neutral-100"
                      : "text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-200"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Emphasized primary channels */}
        <div className="mt-10 flex items-center gap-3">
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-300"
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-300"
          >
            <FaLinkedin className="text-lg" />
          </a>
          <a
            href={`mailto:${PROFILE.links.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-300"
          >
            <HiOutlineMail className="text-xl" />
          </a>
        </div>

        {/* Utility controls: search / music / theme */}
        <div className="mt-6 flex items-center gap-2">
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex h-9 flex-1 items-center gap-2 rounded-md border border-neutral-300 px-3 text-xs text-neutral-500 transition-colors hover:border-accent dark:border-neutral-700"
          >
            <FiSearch />
            <span>Search</span>
            <span className="ml-auto rounded border border-neutral-300 px-1.5 py-0.5 text-[10px] dark:border-neutral-700">⌘K</span>
          </button>
          <IconControl onClick={toggleAudio} label={playing ? "Mute ambient audio" : "Play ambient audio"}>
            {playing ? <TbMusic /> : <TbMusicOff />}
          </IconControl>
          <IconControl onClick={toggleTheme} label={theme === "dark" ? "Switch to light" : "Switch to dark"}>
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </IconControl>
        </div>

        {/* Footer */}
        <div className="mt-auto hidden items-center gap-3 pt-10 text-[11px] text-neutral-500 lg:flex">
          <LiveClock />
          <span>/ © 2026</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" /> live
          </span>
        </div>
      </aside>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
};

export default Sidebar;
