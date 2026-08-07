// status: "live" (deployed, linkable) | "showcase" (real repo/assets, not live-hosted) | "building" (in progress, no public repo yet)

export const PROJECTS = [
  {
    slug: "spectr",
    title: "SPECTR",
    tagline: "Paste a Solana token address, get a risk verdict with the evidence behind it.",
    summary:
      "An AI terminal that never guesses: the model calls a deterministic risk-scoring engine against live on-chain data and reports exactly what it finds.",
    status: "showcase",
    repoUrl: "https://github.com/Mohith174/spectr",
    liveUrl: null,
    tech: ["Next.js", "TypeScript", "Postgres", "Redis", "LLM tool-calling"],
    problem:
      "Rug pulls are constant on Solana, and most tools hand you a price chart and let you guess. SPECTR returns a verdict (SAFE, CAUTION, HIGH, or RUG) plus the specific flags that produced it.",
    decisions: [
      {
        title: "Tool-calling, not free-form generation",
        body: "The LLM never invents a risk score. It calls the scoring engine and narrates what comes back: holder concentration, liquidity depth, volume anomalies. Verdicts are reproducible, not hallucinated.",
      },
      {
        title: "Deterministic rules override the model",
        body: "Hardcoded thresholds decide the verdict, not the AI. A wallet holding over 80% of supply forces a RUG verdict regardless of what the model concludes — the model explains findings, but never gets the final say on the ones that matter.",
      },
    ],
    stack: [
      { component: "Framework", tech: "Next.js (App Router) + TypeScript" },
      { component: "Data", tech: "Postgres (Prisma) + Upstash Redis" },
      { component: "Solana sources", tech: "Helius (holders) · Dexscreener (price/liquidity)" },
      { component: "LLM layer", tech: "Llama 3.1 70B via NVIDIA NIM (OpenAI-compatible tool-calling)" },
      { component: "Alerts", tech: "Telegram Bot API + daily Vercel cron" },
    ],
    diagram: `User input ("check <address>")
        |
        v
Terminal agent --tool call--> Risk-scoring engine
        |                            |
        |               Helius . Dexscreener
        |                            |
        <----------- verdict + flags -
        |
        v
Streamed response, persisted for the accuracy dashboard`,
    screenshots: [],
  },
  {
    slug: "dna-screening-tracker",
    title: "DNA Screening Tracker",
    tagline:
      "A sourced record of what DNA synthesis providers publicly say about screening orders — and what nobody is legally required to say.",
    summary:
      "An open dataset of biosecurity screening disclosure across 24 commercial DNA synthesis providers, built so that a claim cannot enter it without a dated public source.",
    status: "building",
    repoUrl: "https://github.com/Mohith174/dna-synthesis-screening-tracker",
    liveUrl: null,
    tech: ["Node.js", "Static site", "JSON Schema", "GitHub Actions", "Structured data"],
    problem:
      "Turning an AI-designed genome into a real organism requires ordering DNA from a commercial provider — the one physical chokepoint in an otherwise all-software pipeline. Screening at that chokepoint is voluntary almost everywhere, and no public record existed of which providers say they screen. This builds that record, for 24 providers across 7 countries, updated monthly.",
    decisions: [
      {
        title: "The dataset records disclosure, and the build enforces it",
        body: "A provider that publishes nothing is marked 'not stated', never 'no' — a company can screen rigorously and never write about it, so 'no' would assert something no outsider can verify. That rule isn't a convention someone has to remember: CI rejects any commit that sets a screening field to 'no', or that moves a cell off 'unverified' without a source URL, a note locating the claim on the page, and a verification date.",
      },
      {
        title: "Every row is pre-rendered, because the readers don't run JavaScript",
        body: "The natural build is to fetch the JSON and render the table client-side. That would have quietly defeated the project: GPTBot, ClaudeBot, PerplexityBot and CCBot largely don't execute JS, so a dataset published to be cited would have been an empty table to every engine that matters. The build writes all 24 rows into static HTML and JavaScript only adds search and sorting on top.",
      },
      {
        title: "Automation detects change; it never edits data",
        body: "A monthly job re-fetches each policy page and diffs it against a stored hash, then opens an issue. It does not touch the dataset — judging whether reworded text is a real policy change stays with a person. The subtlety is in the hashing: raw HTML would flag all 24 providers every month, since corporate pages embed build ids and timestamps that change per request, so volatile token shapes are blanked before hashing.",
      },
    ],
    stack: [
      { component: "Data layer", tech: "Single providers.json + JSON Schema — no database" },
      { component: "Build", tech: "Node built-ins only, zero runtime dependencies" },
      { component: "Integrity gate", tech: "validate.mjs — blocks unsourced claims in CI" },
      { component: "Change detection", tech: "GitHub Actions monthly cron → issue on diff" },
      { component: "Discoverability", tech: "Dataset + FAQPage JSON-LD, llms.txt, CSV/JSON endpoints" },
    ],
    diagram: `data/providers.json  ──►  validate.mjs  (CI gate: no unsourced claims)
        │
        ▼
    build.mjs
        │
        ├──► index.html      all 24 rows pre-rendered, JSON-LD
        ├──► methodology.html
        └──► providers.json · providers.csv · llms.txt · sitemap

    check-policies.mjs  (monthly cron)
        │
    fetch policy pages ──► strip volatile tokens ──► hash
        │
    changed? ──► open GitHub issue ──► human reviews
                 (never edits the dataset)`,
    screenshots: [],
    metrics: [
      { label: "Providers tracked", value: "24" },
      { label: "Runtime dependencies", value: "0" },
      { label: "Re-verified", value: "Monthly" },
    ],
  },
  {
    slug: "paga-monitor",
    title: "PAGA Monitor",
    tagline: "Turns California's PAGA labor-filing database into scored, searchable leads.",
    summary:
      "A scraper-to-dashboard pipeline that watches California's LWDA filing portal, ingests every new PAGA notice, and surfaces high-value leads for employment lawyers.",
    status: "live",
    repoUrl: "https://github.com/Mohith174/paga-monitor",
    liveUrl: "https://paga-monitor.vercel.app",
    tech: ["Python", "Flask", "Playwright", "Postgres"],
    problem:
      "PAGA notices are public records, but they sit behind a Salesforce search portal with no API, no feed, and no alerts. For plaintiff firms, seeing a filing first is the whole game. PAGA Monitor polls the portal, dedupes what it finds, and scores each case so the best leads surface immediately.",
    decisions: [
      {
        title: "Call the portal's own API, not its HTML",
        body: "The portal is a Salesforce Visualforce app. Instead of parsing rendered tables, a headless browser submits the real search form (required for the signed session) and then invokes the site's own remoting endpoint, getting a month of filings as structured JSON in about three seconds.",
      },
      {
        title: "Ingestion and serving are split on purpose",
        body: "A hosted, browser-based scraper is unreliable, so the Playwright worker runs separately and writes to Postgres; the Flask dashboard is stateless and only reads it, so it deploys cleanly to Vercel with zero knowledge of how the data got there.",
      },
    ],
    stack: [
      { component: "Scraper", tech: "Playwright (headless Chromium) → Visualforce remoting API" },
      { component: "Storage", tech: "Postgres (Neon) — cases, runs, notes, activity log" },
      { component: "Dashboard", tech: "Flask + Jinja2, deployed on Vercel" },
      { component: "Scoring", tech: "Rule-based lead scorer with alert thresholds" },
      { component: "Scheduler", tech: "5-minute polling during business hours" },
    ],
    diagram: `LWDA filing portal (Salesforce)
        |
        v
Playwright worker: submit search form --> invoke remoting API --> JSON
        |
        v
Parser + content hash --> new / amended / duplicate --> Postgres (Neon)
                                                              |
                                                              v
                                          Flask dashboard (leads . priority . analytics . CSV)
                                          -- deployed on Vercel, reads Postgres only`,
    screenshots: [],
    metrics: [
      { label: "Cases tracked", value: "24,000+" },
      { label: "New filings/day", value: "~40" },
      { label: "Full scrape cycle", value: "<3s" },
    ],
  },
  {
    slug: "wiki-kafka",
    title: "Wiki Kafka",
    tagline: "Live Wikipedia edits, streamed through Kafka and visualized in real time.",
    summary:
      "An event-streaming pipeline that ingests 50+ Wikipedia edits per second, aggregates them statefully with Kafka Streams, and ships with monitoring built in.",
    status: "showcase",
    repoUrl: "https://github.com/Mohith174/Wiki-Kafka",
    liveUrl: null,
    tech: ["Java 17", "Spring Boot", "Kafka Streams", "Grafana"],
    problem:
      "Built to demonstrate a production-shaped streaming pipeline end to end: ingestion, stateful stream processing, and monitoring wired together the way a real system needs them, not a toy consumer loop.",
    decisions: [
      {
        title: "Kafka Streams over a plain consumer",
        body: "Rolling per-domain edit aggregates need a state store and fault tolerance that a bare consumer loop doesn't give you for free. Kafka Streams provides both.",
      },
      {
        title: "Observability from day one",
        body: "Prometheus, Grafana, and Alertmanager are part of the initial docker-compose stack, not bolted on after something broke.",
      },
    ],
    stack: [
      { component: "Runtime", tech: "Java 17 / Spring Boot" },
      { component: "Streaming", tech: "Kafka + Kafka Streams + Schema Registry" },
      { component: "Ingestion", tech: "SSE consumer on the Wikimedia edit stream" },
      { component: "Monitoring", tech: "Prometheus + Grafana + Alertmanager" },
      { component: "Orchestration", tech: "Docker Compose (11 services)" },
    ],
    diagram: `Wikimedia SSE stream
        |
        v
Ingestion service --> Kafka cluster (broker . schema registry)
                            |
              +-------------+-------------+
              v             v             v
      Stream processor   Consumer     Monitoring
      (state store)      service      (Prometheus/Grafana)`,
    screenshots: [
      "https://github.com/user-attachments/assets/273bd2f2-4d95-40d2-84c2-f46d0ed5ea68",
      "https://github.com/user-attachments/assets/54666dbc-22d4-4930-9642-d1f4990e471f",
      "https://github.com/user-attachments/assets/02ac7b02-a217-46fb-ae89-e159556fbb87",
    ],
  },
  {
    slug: "payna",
    title: "Payna",
    tagline: "Know exactly what your business has to file, and when, in every state you operate.",
    summary:
      "Regulatory requirements modeled as a graph: an LLM pipeline extracts structured rules from source filings, and one traversal answers what's due and by when.",
    status: "live",
    repoUrl: "https://github.com/Mohith174/payna",
    liveUrl: "https://payna-azure.vercel.app",
    tech: ["TypeScript", "React", "Neo4j", "Postgres", "LLM extraction", "Vercel"],
    problem:
      "Businesses operating across states track a shifting web of licenses, renewal cadences, and dependent filings by hand. Payna models that web as a graph and answers one question directly: for this entity's active licenses, what's required, and when.",
    decisions: [
      {
        title: "Requirements as graph nodes, not edge properties",
        body: "States, license types, requirements, and entities are all first-class nodes, so a requirement can carry its own deadlines and dependencies instead of being flattened into a relationship attribute.",
      },
      {
        title: "LLM extraction feeds the graph, doesn't replace it",
        body: "Source filings are messy and inconsistent. The LLM parses them into validated requirement records that populate the graph; end-user answers come from graph traversal, never from raw model output.",
      },
    ],
    stack: [
      { component: "Graph DB", tech: "Neo4j Aura (schema + traversal engine)" },
      { component: "Extraction", tech: "NVIDIA Nemotron via OpenAI-compatible endpoint" },
      { component: "Audit store", tech: "Postgres (audit log, extraction attempts)" },
      { component: "Frontend", tech: "Vite + React dashboard" },
      { component: "Deploy", tech: "Vercel serverless function + static web build" },
    ],
    diagram: `Source filing documents
        |
        v
LLM extraction --> validated Requirement records
        |
        v
Neo4j graph (Entity -REQUIRES-> Requirement -RENEWS_EVERY-> ...)
        |
        v
Traversal: entity + active states --> required filings + deadlines`,
    screenshots: [],
  },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);
