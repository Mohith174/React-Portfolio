// status: "live" (deployed, linkable) | "showcase" (real repo/assets, not live-hosted) | "building" (in progress, no public repo yet)

export const PROJECTS = [
  {
    slug: "spectr",
    title: "SPECTR",
    tagline: "Paste a Solana token address, get a risk verdict with the evidence behind it.",
    summary:
      "An AI terminal that never guesses: the model calls a deterministic risk-scoring engine against live on-chain data and reports exactly what it finds.",
    status: "building",
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
        title: "Cross-referenced data, not single-source",
        body: "Holder data comes from Helius; price and liquidity are cross-checked against Dexscreener and Birdeye, so one source lying doesn't silently produce a wrong verdict.",
      },
    ],
    stack: [
      { component: "Framework", tech: "Next.js (App Router) + TypeScript" },
      { component: "Data", tech: "Postgres (Prisma) + Upstash Redis" },
      { component: "Solana sources", tech: "Helius · Birdeye · Dexscreener" },
      { component: "LLM layer", tech: "OpenAI-compatible tool-calling (NVIDIA NIM)" },
      { component: "Alerts", tech: "Telegram Bot API" },
    ],
    diagram: `User input ("check <address>")
        |
        v
Terminal agent --tool call--> Risk-scoring engine
        |                            |
        |             Helius . Dexscreener . Birdeye
        |                            |
        <----------- verdict + flags -
        |
        v
Streamed response, persisted for the accuracy dashboard`,
    screenshots: [],
  },
  {
    slug: "paga-monitor",
    title: "PAGA Monitor",
    tagline: "Turns California's PAGA labor-filing database into scored, searchable leads.",
    summary:
      "A scraper-to-dashboard pipeline that watches California's LWDA filing portal, ingests every new PAGA notice, and surfaces high-value leads for employment lawyers.",
    status: "showcase",
    repoUrl: null,
    liveUrl: null,
    tech: ["Python", "Flask", "Playwright", "SQLite"],
    problem:
      "PAGA notices are public records, but they sit behind a Salesforce search portal with no API, no feed, and no alerts. For plaintiff firms, seeing a filing first is the whole game. PAGA Monitor polls the portal, dedupes what it finds, and scores each case so the best leads surface immediately.",
    decisions: [
      {
        title: "Call the portal's own API, not its HTML",
        body: "The portal is a Salesforce Visualforce app. Instead of parsing rendered tables, a headless browser submits the real search form (required for the signed session) and then invokes the site's own remoting endpoint, getting a month of filings as structured JSON in about three seconds.",
      },
      {
        title: "Content-hash dedup makes every scrape idempotent",
        body: "Each case is hashed over its key fields, so the 5-minute poller and multi-month backfills share one write path: every row classifies as new, amended, or duplicate. Re-scraping an overlapping date range can't corrupt the data.",
      },
    ],
    stack: [
      { component: "Scraper", tech: "Playwright (headless Chromium) → Visualforce remoting API" },
      { component: "Storage", tech: "SQLite (cases, runs, notes, activity log)" },
      { component: "Dashboard", tech: "Flask + Jinja2 (leads, priority queue, analytics, CSV export)" },
      { component: "Scoring", tech: "Rule-based lead scorer with alert thresholds" },
      { component: "Scheduler", tech: "5-minute polling during business hours" },
    ],
    diagram: `LWDA filing portal (Salesforce)
        |
        v
Playwright: submit search form --> invoke remoting API --> JSON
        |
        v
Parser + content hash --> new / amended / duplicate
        |
        v
SQLite --> Flask dashboard (leads . priority . analytics . CSV)`,
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
      { component: "Orchestration", tech: "Docker Compose (9 services)" },
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
    status: "building",
    repoUrl: null,
    liveUrl: null,
    tech: ["TypeScript", "React", "Neo4j", "Postgres", "LLM extraction"],
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
      { component: "Graph DB", tech: "Neo4j (schema + traversal engine)" },
      { component: "Extraction", tech: "LLM structured extraction from source filings" },
      { component: "Audit store", tech: "Postgres (audit log, extraction attempts)" },
      { component: "Frontend", tech: "React dashboard" },
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
