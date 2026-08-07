import { PUBLISHED } from "./articles.js";

// Section registry — the single list that drives the numbered sidebar nav,
// the scroll-spy, and the command palette. Order here is the page order.
//
// WRITING only appears once at least one article is published, and the numbers
// are derived rather than hardcoded so the sequence never develops a gap.
const BASE = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  ...(PUBLISHED.length > 0 ? [{ id: "writing", label: "WRITING" }] : []),
  { id: "challenge", label: "CHALLENGE" },
  { id: "contact", label: "CONTACT" },
];

export const SECTIONS = BASE.map((s, i) => ({
  ...s,
  num: String(i + 1).padStart(2, "0"),
}));
