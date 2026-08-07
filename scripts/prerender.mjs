#!/usr/bin/env node
/**
 * Post-build prerender for crawlable routes.
 *
 * The problem this solves: Vite ships one index.html with an empty <div id="root">.
 * Every route therefore serves the same shell, carrying the HOME page's <title>,
 * description and canonical. So `/writing/dna-synthesis-screening` told a crawler
 * it was the homepage and contained no article text at all.
 *
 * That matters more than usual here. Googlebot renders JS inconsistently; the AI
 * answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended,
 * CCBot) largely do not execute it. An essay that only exists after hydration is,
 * to all of them, a blank page with the wrong title.
 *
 * This writes a real HTML file per route with correct metadata, JSON-LD, and the
 * article text present in the markup. React clears #root on mount, so the
 * prerendered copy is a fallback for crawlers and slow connections, never a
 * second source of truth — it is generated from the same data the app renders.
 *
 * Vercel checks the filesystem before applying rewrites, so these files win over
 * the SPA catch-all in vercel.json.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PUBLISHED as ARTICLES } from "../src/data/articles.js";
import { PROJECTS } from "../src/data/projects.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const ORIGIN = "https://www.mohithkodavati.com";
const AUTHOR = "Mohith Kodavati";

const template = readFileSync(join(DIST, "index.html"), "utf8");

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const jsonld = (o) =>
  JSON.stringify(o, null, 2).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");

/** Article body blocks -> semantic HTML, mirroring what ArticleDetail renders. */
const blockHtml = (b) => {
  switch (b.type) {
    case "h2":
      return `<h2>${esc(b.text)}</h2>`;
    case "quote":
      return `<blockquote><p>${esc(b.text)}</p></blockquote>`;
    case "note":
      return `<aside><p>${esc(b.text)}</p></aside>`;
    case "stat":
      return `<dl>${b.items
        .map((s) => `<dt>${esc(s.value)}</dt><dd>${esc(s.label)}</dd>`)
        .join("")}</dl>`;
    case "list":
      return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    default:
      return `<p>${esc(b.text)}</p>`;
  }
};

/**
 * Rewrite the shell for one route.
 *
 * The template's head already carries home-page meta, so each tag is REPLACED
 * rather than appended — appending would leave two <title> elements and two
 * canonicals, and crawlers resolve that ambiguity unpredictably.
 */
const render = ({ path, title, description, ld = [], body = "" }) => {
  const url = `${ORIGIN}${path}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${esc(description)}" />`
  );
  html = html.replace(
    /<link rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${url}" />`
  );
  html = html.replace(/<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(
    /<meta property="og:title"[^>]*\/>/,
    `<meta property="og:title" content="${esc(title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${esc(description)}" />`
  );
  html = html.replace(/<meta name="twitter:url"[^>]*\/>/, `<meta name="twitter:url" content="${url}" />`);
  html = html.replace(
    /<meta name="twitter:title"[^>]*\/>/,
    `<meta name="twitter:title" content="${esc(title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${esc(description)}" />`
  );

  if (ld.length) {
    html = html.replace(
      "</head>",
      ld.map((o) => `<script type="application/ld+json">\n${jsonld(o)}\n</script>`).join("\n") +
        "\n</head>"
    );
  }

  if (body) html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  return html;
};

const write = (path, html) => {
  const dir = join(DIST, path === "/" ? "" : path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
};

/* ------------------------------------------------------------------ routes */

const pages = [];

// Writing index — only when something is published. Emitting this file while
// the route was gated is exactly how a draft would leak: Vercel serves the
// filesystem before it consults rewrites, so a stray static file is reachable
// even with no matching React route.
if (ARTICLES.length > 0)
  pages.push({
    path: "/writing",
  title: `Writing — ${AUTHOR}`,
  description:
    "Essays where I went and got the data rather than reacting to the headline. Usually there is a thing I built underneath.",
  ld: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Writing",
      url: `${ORIGIN}/writing`,
      author: { "@type": "Person", name: AUTHOR, url: ORIGIN },
    },
  ],
  body:
    `<main><h1>Writing</h1>` +
    ARTICLES.map(
      (a) =>
        `<article><h2><a href="/writing/${esc(a.slug)}">${esc(a.title)}</a></h2>` +
        `<p><time datetime="${esc(a.date)}">${esc(a.dateLabel)}</time></p>` +
        `<p>${esc(a.dek)}</p></article>`
    ).join("") +
    `</main>`,
  });

// One page per article — the whole point of the exercise.
for (const a of ARTICLES) {
  pages.push({
    path: `/writing/${a.slug}`,
    title: a.title,
    description: a.dek,
    ld: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.title,
        description: a.dek,
        datePublished: a.date,
        dateModified: a.date,
        author: { "@type": "Person", name: AUTHOR, url: ORIGIN },
        publisher: { "@type": "Person", name: AUTHOR, url: ORIGIN },
        mainEntityOfPage: `${ORIGIN}/writing/${a.slug}`,
        keywords: a.tags,
        inLanguage: "en",
        // Ties the essay to the dataset's @id so the two pages form one entity
        // graph rather than two unrelated documents.
        ...(a.companion ? { about: { "@id": `${ORIGIN}/dna-screening/#dataset` } } : {}),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Writing", item: `${ORIGIN}/writing` },
          { "@type": "ListItem", position: 2, name: a.title, item: `${ORIGIN}/writing/${a.slug}` },
        ],
      },
    ],
    body:
      `<main><article><h1>${esc(a.title)}</h1>` +
      `<p><time datetime="${esc(a.date)}">${esc(a.dateLabel)}</time> · ${esc(a.readingTime)}</p>` +
      `<p>${esc(a.dek)}</p>` +
      a.body.map(blockHtml).join("") +
      (a.companion
        ? `<aside><h2>${esc(a.companion.title)}</h2><p>${esc(a.companion.description)}</p>` +
          `<p><a href="${esc(a.companion.href)}">Open the tracker</a></p></aside>`
        : "") +
      `</article></main>`,
  });
}

// Project pages
for (const p of PROJECTS) {
  pages.push({
    path: `/projects/${p.slug}`,
    title: `${p.title} — ${AUTHOR}`,
    description: p.summary,
    ld: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: p.title,
        description: p.summary,
        codeRepository: p.repoUrl || undefined,
        url: `${ORIGIN}/projects/${p.slug}`,
        programmingLanguage: p.tech,
        author: { "@type": "Person", name: AUTHOR, url: ORIGIN },
      },
    ],
    body:
      `<main><article><h1>${esc(p.title)}</h1><p>${esc(p.tagline)}</p>` +
      `<p>${esc(p.problem)}</p>` +
      p.decisions.map((d) => `<h2>${esc(d.title)}</h2><p>${esc(d.body)}</p>`).join("") +
      `</article></main>`,
  });
}

for (const page of pages) write(page.path, render(page));

// The home shell keeps its own metadata; only the canonical is corrected, since
// the committed template pointed at the apex, which 308-redirects to www.
write(
  "/",
  template.replace(
    /<link rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${ORIGIN}/" />`
  )
);

console.log(`prerendered ${pages.length + 1} routes:`);
for (const p of pages) console.log(`  ${p.path}`);
