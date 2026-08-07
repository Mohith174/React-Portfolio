// DRAFT — not imported by the app, so none of this reaches the JS bundle.
// When it is ready, move the object back into ../articles.js with published: true.
//

export const DRAFT_ARTICLES = [
  {
    // Draft. Nothing with published:false is routed, linked, prerendered, or
    // listed in the sitemap -- see PUBLISHED below. Flip this one flag to ship.
    published: false,
    slug: "dna-synthesis-screening",
    title: "The virus wasn't the breakthrough. The order form was.",
    dek: "An AI wrote sixteen working viruses. The part nobody covered is the step where a designed genome becomes a physical thing — and how little stands at it.",
    date: "2026-08-07",
    dateLabel: "August 7, 2026",
    readingTime: "6 min",
    tags: ["Biosecurity", "AI", "Policy"],
    // Surfaces on the article page as a linked companion artifact.
    companion: {
      label: "The dataset behind this piece",
      title: "DNA Synthesis Screening Tracker",
      description:
        "24 commercial synthesis providers, sourced screening-disclosure status, updated monthly.",
      href: "/dna-screening",
      repo: "https://github.com/Mohith174/dna-synthesis-screening-tracker",
    },
    body: [
      {
        type: "p",
        text: "Last week a genome language model wrote a virus that worked. Sixteen of them, actually.",
      },
      {
        type: "p",
        text: "A team led by Brian Hie at Stanford and the Arc Institute used Evo 1 and Evo 2 — models trained on DNA the way GPT was trained on text — to generate complete bacteriophage genomes from scratch, using the natural phage ΦX174 as a design template. They filtered thousands of candidates down to roughly 300, successfully synthesized and assembled 285 of them in E. coli, and 16 booted up: functional, replicating viruses with no ancestor in nature. Several outcompeted the wild ΦX174 they were modeled on, and a cocktail of the generated phages cleared ΦX174-resistant E. coli. The work appeared in Science on August 6th, after eleven months as a preprint.",
      },
      {
        type: "p",
        text: "The coverage has been about the viruses. I want to talk about the order form.",
      },

      { type: "h2", text: "These are not the viruses you're worried about" },
      {
        type: "p",
        text: "Bacteriophages infect bacteria. They cannot infect you. Every one of these organisms was designed to attack E. coli, tested in a dish, and none has been near a patient. The Evo models were deliberately built with viruses that infect eukaryotes — which includes every human pathogen — excluded from their training data, and the developers verified the resulting model was measurably worse at eukaryotic viruses, as intended. The genome length these systems can currently write tops out around the size of a small phage: orders of magnitude below a bacterium, further still below anything that infects people.",
      },
      {
        type: "p",
        text: "So the pandemic framing is wrong, and if that's all you took from the headlines you can stop worrying about that specific thing.",
      },
      {
        type: "p",
        text: "Here's what I think you should worry about instead — and it starts with the fact that the training exclusion, the safeguard everyone points to, has already been shown to come off. Researchers demonstrated that fine-tuning Evo 2 on the very human-infecting viral sequences it was trained to avoid restores the capability, producing a model better at predicting SARS-CoV-2 immune escape than the original. The weights are open. The safeguard is a speed bump on a road that is still there.",
      },

      { type: "h2", text: "A designed genome is just a file until someone prints it" },
      {
        type: "p",
        text: "The lab did not grow these viruses from an ancestor. They ordered DNA. A designed genome is a text file; turning it into a physical organism requires a commercial synthesis provider to accept the order, manufacture the strand, and ship it.",
      },
      {
        type: "p",
        text: "That step is the chokepoint. It is the one place in the entire pipeline where a human institution stands between a sequence and a living thing. Everything upstream — the model, the training, the generation — is software, and software diffuses. The synthesis step is physical, industrial, and concentrated among a few dozen companies worldwide. If you wanted to design a control point for synthetic biology, you would design that one.",
      },
      {
        type: "quote",
        text: "We have that chokepoint. What we don't have is a working lock on it.",
      },

      { type: "h2", text: "Two problems, and the second is worse" },
      {
        type: "p",
        text: "The first is technical. Screening at synthesis providers works by comparison: an incoming order is matched against databases of known hazardous sequences. That is a sensible design against a threat model where dangerous sequences are things that already exist and are already catalogued. It is exactly the wrong design against a generative model, whose entire function is producing sequences that have never existed. Novelty is not an edge case here — it's the product. A screen built on recognition cannot see a thing built to be unrecognized.",
      },
      {
        type: "p",
        text: "The second problem is that the screening is voluntary. I wanted to know how voluntary, so I went through the published policies of 24 commercial DNA and gene synthesis providers across seven countries and recorded what each one actually says.",
      },
      {
        type: "stat",
        items: [
          { value: "12 / 24", label: "on the IGSC member roster — the other twelve are not" },
          { value: "7", label: "publicly state they screen order sequences" },
          { value: "0", label: "under a binding legal requirement to screen" },
        ],
      },
      {
        type: "p",
        text: "That last number is the one to sit with. Not a small number — zero. Across every jurisdiction represented in the dataset, I could not identify a single general legal duty requiring a company that sells synthetic DNA to look at what it is selling.",
      },
      {
        type: "p",
        text: "The United States comes closest, and the shape of how it falls short is instructive. The OSTP framework issued in April 2024 does require screening — but of the buyer, not the seller. Federally funded researchers must purchase from providers that publicly self-attest to screening. A provider that declines to attest breaks no law and pays no penalty; it just becomes ineligible for one slice of the market. That is procurement policy wearing the costume of regulation, and it stops precisely where federal money stops.",
      },
      {
        type: "p",
        text: "The International Gene Synthesis Consortium is the other pillar, and it is an industry body. Its members commit to screening because they chose to. That commitment is real and the members who make it appear to take it seriously — but it is a promise, not a law, and it binds only the companies who joined. Half the providers I looked at have not joined. A provider that never joins is not in violation of anything. A member that quietly relaxes its policy triggers no filing, no notice, no penalty.",
      },
      {
        type: "note",
        text: "A necessary caveat, and it is load-bearing: “does not publicly state” is not “does not screen.” A company can screen rigorously and never publish a page about it. The tracker records public disclosure only, and it never marks a provider as failing to screen — that would be a claim about internal practice that no outside observer can support. What it documents is the gap between what is promised in public and what is required by anyone.",
      },

      { type: "h2", text: "The asymmetry is the story" },
      {
        type: "p",
        text: "Design capability is improving on the curve you'd expect from machine learning: fast, funded, published, open-weighted. Screening capability is improving on the curve you'd expect from voluntary industry self-governance, which is to say roughly not at all. Those two lines were never parallel, and the gap between them is the actual risk surface.",
      },
      {
        type: "p",
        text: "Which points at what the fix isn't. The instinct after a story like this is to reach for the model — restrict who can train genome models, or what they can generate. I think that's the wrong lever, and not only for the usual reasons about open science. The models are already released. The weights are downloadable. The safeguard was already demonstrated to be removable by anyone with a GPU and a weekend. The capability doesn't un-exist because a policy says it should, and the marginal person you stop is a graduate student, not a determined actor.",
      },
      {
        type: "p",
        text: "The synthesis providers are a different kind of target. There are a few dozen of them. They are corporations with addresses, customers, and export exposure. They already screen — voluntarily, imperfectly, but the machinery exists and the norm exists. Making it mandatory is a regulatory problem, not a scientific one, and unlike restricting models it is actually enforceable.",
      },

      { type: "h2", text: "What would need to happen" },
      {
        type: "p",
        text: "Two things, roughly. Screening becomes a legal requirement for anyone selling synthetic nucleic acids, rather than a courtesy extended by the well-behaved and a procurement condition attached to federal grants. And the screening method shifts from database matching to something that evaluates what a sequence would do — function rather than resemblance — because the sequences that matter from here forward will not resemble anything.",
      },
      {
        type: "p",
        text: "Neither is exotic. Both have been proposed for years. The reason this week matters is that the argument for them stopped being hypothetical: sixteen working organisms nothing had ever seen, and a checkpoint that would not have recognized any of them.",
      },
      {
        type: "p",
        text: "I built a tracker of where every major synthesis provider stands. It updates monthly, every cell cites the provider's own words, and when a provider quietly changes its screening language, that change is going to show up in public.",
      },

      { type: "h2", text: "Sources" },
      {
        type: "list",
        items: [
          "King et al., “Generative design of bacteriophages with genome language models,” Science, 6 August 2026. DOI 10.1126/science.aec2657",
          "Brixi et al., “Genome modelling and design across all domains of life with Evo 2,” Nature — for the training-data exclusion of eukaryote-infecting viruses",
          "“Open-weight genome language model safeguards: assessing robustness via adversarial fine-tuning,” arXiv:2511.19299 — for the removability of that exclusion",
          "OSTP/NSTC Framework for Nucleic Acid Synthesis Screening, April 2024",
          "International Gene Synthesis Consortium published member roster, retrieved 7 August 2026",
          "Provider figures: DNA Synthesis Screening Tracker, 13 of 24 rows verified against primary sources as of publication",
        ],
      },
    ],
  },
];

