import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    year: "June 2025 - September 2025",
    role: "Global Technology Intern",
    company: "Colgate Palmolive - Technology Center",
    bullets: [
      "Engineered a Python (Pandas, NumPy) data-cleansing pipeline processing 50K+ records, coordinating with factory sites across 3 continents and enforcing multi-stage QA validation protocols.",
      "Automated document migration pipelines using VBA, Excel automation, and batch scripting to migrate 13K+ global documents from SAP DMS and Google Drive to ETQ, achieving 40% performance gains via optimized workflows and metadata reconciliation.",
      "Built batch scripts and multi-condition formula logic to standardize document workflows across teams in Asia, Australia, and Europe.",
      "Partnered with the Data Warehousing team, reporting to a director, on a separate ETL pipeline handling SAP-to-ETQ data transfer.",
    ],
    technologies: ["Python (Pandas, NumPy)", "VBA / Excel Automation", "Batch Scripts", "SAP DMS", "ETL Pipelines"],
  },
  {
    year: "May 2025 - June 2025",
    role: "Software Engineer Extern",
    company: "Data Storytelling, LLC",
    bullets: [
      "Worked in a team of 4 to build a full-stack React-TypeScript raffle platform with a Supabase backend and secure payment integration.",
      "Implemented user authentication, raffle creation, ticket purchasing, and real-time winner selection.",
      "Ensured responsive design and cross-browser compatibility for production use.",
    ],
    technologies: ["TypeScript", "React", "Supabase", "Stripe API", "Vercel"],
  },
  {
    year: "August 2024 - September 2024",
    role: "Data Analyst Extern",
    company: "Colgate Palmolive via Rutgers MBS",
    bullets: [
      "Analyzed supplier purchase history to identify and close compliance gaps against regional QTA standards for procurement of highly active ingredients.",
      "Cross-referenced supplier data with historical purchase records through the QTA database to improve analytical process efficiency.",
      "Built data visualizations to illustrate compliance gaps, enabling proactive adjustments and continued quality-standard adherence.",
    ],
    technologies: ["Python (NumPy)", "Excel", "Tableau", "QTA Database Systems"],
  },
];

const Experience = () => {
  return (
    <div className="border-b border-neutral-200 py-16">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-semibold text-neutral-900"
      >
        Experience
      </motion.h1>
      <div>
        {EXPERIENCES.map((experience, index) => (
          <div key={index} className="mb-10 flex flex-wrap lg:justify-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/4"
            >
              <p className="mb-2 font-mono text-sm text-neutral-500">{experience.year}</p>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold text-neutral-900">
                {experience.role} — <span className="text-purple-600">{experience.company}</span>
              </h6>
              <ul className="mb-4 list-disc space-y-1.5 pl-5 text-neutral-600">
                {experience.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <span key={i} className="rounded-md bg-purple-50 px-2 py-1 font-mono text-xs font-medium text-purple-700">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
