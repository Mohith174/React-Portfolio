// Single source of truth for identity, links, and the About section.
// Keep copy here so edits never require touching component JSX.

export const PROFILE = {
  firstName: "MOHITH",
  lastName: "KODAVATI",
  // One-line role summary (kept intentionally broad — the resume carries the detail).
  title: "B.S. Computer Science & Data Science, Rutgers University",
  status: "open to opportunities",
  location: "Dallas, TX",

  // GitHub / LinkedIn / email are the emphasized primary channels.
  links: {
    github: "https://github.com/Mohith174",
    linkedin: "https://www.linkedin.com/in/mohitkodavati",
    email: "mohitkod178@gmail.com",
  },

  about: [
    "I'm a recent Computer Science and Data Science graduate from Rutgers University, based in Dallas and open to opportunities anywhere.",
    "I'm Python-first and AI-native: I build agentic systems and LLM agents wired to real tools instead of free-form chat, backed by production-grade backend engineering. Before that I shipped full-stack products end to end, so I'm comfortable owning a feature from the database schema to the UI.",
    "The through-line: I build solutions to real problems using tech.",
  ],

  technologies: [
    "Python", "TypeScript", "Java", "C++", "SQL",
    "React", "Next.js", "Node.js", "Flask", "FastAPI",
    "Pandas", "PyTorch", "Postgres", "Kafka", "Docker",
  ],

  interests: [
    "Agentic AI & LLM tooling",
    "Data Science",
    "Backend & System Design",
    "Full-Stack Development",
  ],
};
