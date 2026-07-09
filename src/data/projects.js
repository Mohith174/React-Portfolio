// status: "live" (deployed, linkable) | "showcase" (real repo/assets, not live-hosted) | "building" (in progress, no public repo yet)

export const PROJECTS = [
  {
    slug: "spectr",
    title: "SPECTR",
    tagline: "Forensic risk terminal for Solana tokens — paste an address, get a verdict.",
    summary:
      "An AI-fronted terminal that never guesses: the model calls a deterministic risk-scoring engine against live on-chain data and reports exactly what it finds.",
    status: "building",
    repoUrl: "https://github.com/Mohith174/spectr",
    liveUrl: null,
    tech: ["Next.js", "TypeScript", "Prisma", "Postgres", "Redis", "NVIDIA NIM"],
    problem:
      "Rug pulls and scam tokens are constant on Solana. Most tools hand you a price chart and let you guess. SPECTR is a terminal you paste an address into and get back a verdict — SAFE, CAUTION, HIGH, or RUG — with the specific flags that produced it.",
    decisions: [
      {
        title: "Tool-calling, not free-form generation",
        body: "The LLM never invents a risk score. It calls assess_token_risk and narrates exactly what the deterministic scoring engine returns — holder concentration, liquidity depth, volume anomalies. Verdicts are reproducible, not hallucinated.",
      },
      {
        title: "OpenAI-compatible, not OpenAI-locked",
        body: "The chat/tool-calling layer runs against NVIDIA NIM's free, OpenAI-compatible endpoint (Llama 3.1) instead of a paid model — same tools-calling contract, zero marginal cost per query.",
      },
      {
        title: "Cross-referenced data, not single-source",
        body: "Holder distribution comes from Helius, pricing and liquidity are cross-checked against Dexscreener and Birdeye — one source lying doesn't silently produce a wrong verdict.",
      },
    ],
    stack: [
      { component: "Framework", tech: "Next.js (App Router) + TypeScript" },
      { component: "Auth", tech: "Clerk" },
      { component: "Database", tech: "Postgres via Prisma" },
      { component: "Cache", tech: "Upstash Redis" },
      { component: "Solana data", tech: "Helius · Birdeye · Dexscreener" },
      { component: "LLM layer", tech: "NVIDIA NIM (Llama 3.1, OpenAI-compatible)" },
      { component: "Alerts", tech: "Telegram Bot API" },
    ],
    diagram: `User input ("check <address>")
        |
        v
Terminal agent --tool call--> Forensics engine
        |                            |
        |             Helius (holders) . Dexscreener/Birdeye (price, liquidity)
        |                            |
        <----------- verdict + flags -
        |
        v
Streamed response, persisted to Postgres for the accuracy dashboard`,
    screenshots: [],
  },
  {
    slug: "wiki-kafka",
    title: "Wiki Kafka",
    tagline: "Real-time Wikipedia edit stream, processed through Kafka Streams, visualized live.",
    summary:
      "A 9-container event-streaming stack that ingests 50+ Wikipedia edits per second, aggregates them statefully, and ships full observability out of the box.",
    status: "showcase",
    repoUrl: "https://github.com/Mohith174/Wiki-Kafka",
    liveUrl: null,
    tech: ["Java 17", "Spring Boot", "Kafka Streams", "Prometheus", "Grafana"],
    problem:
      "Built to demonstrate a production-shaped event-streaming pipeline end to end, not a toy consumer loop: ingestion, stateful stream processing, and monitoring all wired together the way a real system would need them.",
    decisions: [
      {
        title: "Kafka Streams over a plain consumer",
        body: "Rolling per-domain edit aggregates need a state store and fault tolerance a bare consumer loop doesn't give you for free — Kafka Streams' state stores handle both.",
      },
      {
        title: "Schema Registry from day one",
        body: "Enforces a contract between the ingestion service and every downstream consumer, so the pipeline can grow past a single team without silent breakage.",
      },
      {
        title: "Observability as a first-class citizen",
        body: "Prometheus, Grafana, and Alertmanager are part of the initial docker-compose stack, not bolted on after something broke in production.",
      },
    ],
    stack: [
      { component: "Runtime", tech: "Java 17 / Spring Boot 3.2.1" },
      { component: "Messaging", tech: "Apache Kafka 3.6.1 + Kafka Streams" },
      { component: "Schema", tech: "Confluent Schema Registry" },
      { component: "Metrics", tech: "Prometheus + Grafana + Alertmanager" },
      { component: "Ingestion", tech: "OkHttp SSE consumer (Wikimedia stream)" },
      { component: "Orchestration", tech: "Docker Compose (9 services)" },
    ],
    diagram: `Wikimedia SSE stream
        |
        v
Ingestion service (8084) --> Kafka cluster (broker, zookeeper, schema registry)
                                    |
                +-------------------+-------------------+
                v                   v                   v
      Stream processor (8082)  Consumer service (8083)  Monitoring
      Kafka Streams state store                          (Prometheus/Grafana/Alertmanager)`,
    screenshots: [
      "https://github.com/user-attachments/assets/273bd2f2-4d95-40d2-84c2-f46d0ed5ea68",
      "https://github.com/user-attachments/assets/54666dbc-22d4-4930-9642-d1f4990e471f",
      "https://github.com/user-attachments/assets/02ac7b02-a217-46fb-ae89-e159556fbb87",
    ],
  },
  {
    slug: "medvision",
    title: "MedVision AI",
    tagline: "AI-assisted wrist fracture detection with automated report generation.",
    summary:
      "A fine-tuned DenseNet121 model that flags wrist fractures from DICOM images and drafts a structured report, built to slot into existing radiology workflows.",
    status: "showcase",
    repoUrl: "https://github.com/Mohith174/MedVision",
    liveUrl: null,
    tech: ["Python", "MONAI", "DenseNet121", "FastAPI", "Streamlit"],
    problem:
      "Radiology backlogs mean fractures wait longer than they should for a first read. MedVision triages: it flags likely fractures and pre-drafts the report, so a radiologist reviews rather than starts from a blank page.",
    decisions: [
      {
        title: "MONAI over a generic vision pipeline",
        body: "MONAI's transforms handle DICOM-specific preprocessing (windowing, orientation, spacing) that a generic image-classification pipeline gets wrong on medical data.",
      },
      {
        title: "Batch inference decoupled from the UI",
        body: "The inference engine runs against a queue rather than blocking a single Streamlit request, so it can scale independently of the interface.",
      },
    ],
    stack: [
      { component: "Model", tech: "DenseNet121, fine-tuned via MONAI" },
      { component: "Imaging", tech: "DICOM feature extraction" },
      { component: "Serving", tech: "FastAPI batch inference" },
      { component: "Interface", tech: "Streamlit" },
      { component: "Reporting", tech: "fpdf structured report generation" },
    ],
    diagram: `DICOM input
     |
     v
Preprocessing (MONAI transforms)
     |
     v
DenseNet121 inference --> risk classification
     |
     v
Structured report (fpdf) + Streamlit analytics dashboard`,
    screenshots: [],
    metrics: [{ label: "Test-set accuracy", value: "80%" }],
  },
  {
    slug: "payna",
    title: "Payna",
    tagline: "Regulatory filing tracker — know exactly what's due, and when, across every jurisdiction you operate in.",
    summary:
      "Entities, licenses, and requirements modeled as a graph; an LLM extraction pipeline reads source filings and populates it; a traversal engine turns 'what does this business need to file, and by when' into a single query.",
    status: "building",
    repoUrl: null,
    liveUrl: null,
    tech: ["Neo4j", "TypeScript", "LLM extraction", "Postgres", "React"],
    problem:
      "Businesses operating across multiple states/jurisdictions have to track a shifting web of licenses, renewal cadences, and dependent filings by hand. Payna models that web as a graph and traverses it to answer one question directly: for this entity's current set of active licenses, what's required, and when.",
    decisions: [
      {
        title: "Requirements as graph nodes, not edge properties",
        body: "State, LicenseType, Requirement, and Entity are all first-class nodes connected by REQUIRES / RENEWS_EVERY / DEPENDS_ON edges — so a requirement can have its own deadlines and dependencies rather than being flattened into a relationship attribute.",
      },
      {
        title: "LLM extraction feeds the graph, doesn't replace it",
        body: "Source filing documents are messy and inconsistent; an LLM extraction pipeline parses them into structured requirement records with validation, rather than trying to answer end-user queries directly from raw text.",
      },
    ],
    stack: [
      { component: "Graph DB", tech: "Neo4j (schema + traversal engine)" },
      { component: "Extraction", tech: "LLM-based structured extraction from source filings" },
      { component: "Relational store", tech: "Postgres (audit log, extraction attempts)" },
      { component: "Frontend", tech: "React dashboard" },
      { component: "Deploy target", tech: "Docker / Kubernetes" },
    ],
    diagram: `Source filing documents
        |
        v
LLM extraction pipeline --> validated Requirement records
        |
        v
Neo4j graph (Entity -REQUIRES-> Requirement -RENEWS_EVERY-> ...)
        |
        v
Traversal engine: entity + active states --> required filings + deadlines`,
    screenshots: [],
  },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);
