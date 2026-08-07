# Deployment notes

## Routing

`vercel.json` does two things, and the order of the rules is load-bearing.

1. **`/dna-screening/*` proxies to a separate deploy.** The DNA Synthesis
   Screening Tracker lives in its own repo
   ([dna-synthesis-screening-tracker](https://github.com/Mohith174/dna-synthesis-screening-tracker))
   and deploys independently, but it is *served* from this domain.

   A subdomain would have been simpler to wire up and was the original plan. It
   was rejected on SEO grounds: search engines treat a subdomain as a separate
   site, so it would inherit none of this domain's accumulated authority, and
   every link the tracker earned would build a property that never lifted the
   main domain. For a project whose whole strategy is earning citations, that
   discards the compounding. A rewrite is a server-side proxy, so crawlers only
   ever see one origin.

   Consequence for the tracker's own build: all of its in-page hrefs are
   relative, so it works at whatever path it is mounted under. Only its metadata
   URLs (canonical, og:url, JSON-LD, sitemap) are absolute.

2. **The SPA catch-all must come last.** `/(.*) -> /index.html` is what makes
   client-side routing work on hard refresh. If it precedes the tracker rules,
   React Router swallows `/dna-screening` and renders a 404 page instead.

`vercel.json` is validated against a strict schema and rejects unknown keys —
including any attempt to leave a `comment` field inline. That is why this file
exists.

## robots.txt and sitemap.xml

Both live in `public/` and are served from the domain root. **Only the root copy
is authoritative.** The tracker ships its own `robots.txt` and `sitemap.xml`, but
because it is mounted at `/dna-screening/`, no crawler will ever read them — this
site's root `robots.txt` governs that path. AI-crawler permissions for the
dataset therefore have to be set here.

Sitemap URLs use the `www` form because the apex 308-redirects to it; listing the
apex form makes every entry a wasted redirect hop.

## The trailing slash on /dna-screening is not optional

The tracker uses **relative** asset paths (`style.css`, not `/style.css`) so it can be mounted at any
path. That means the URL must end in a slash.

At `/dna-screening/` the browser resolves `style.css` to `/dna-screening/style.css`, which the rewrite
proxies correctly. At `/dna-screening` — no slash — it resolves to `/style.css` at the domain root,
which the SPA catch-all answers with `index.html`. The browser receives HTML where it expected CSS,
silently discards it, and renders the tracker completely unstyled with no working JavaScript.

Hence the permanent redirect above. It is listed under `redirects`, not `rewrites`, because Vercel
processes redirects first — a rewrite would never fire in time to fix the resolution.

Always link to `/dna-screening/` with the slash.
