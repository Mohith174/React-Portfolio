import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { EXPERIENCES } from "../../data/experience";

const ExperienceSection = () => (
  <section id="experience" className="scroll-mt-24 py-16">
    <SectionHeader num="02" title="EXPERIENCE" />
    <div className="space-y-10">
      {EXPERIENCES.map((exp, i) => (
        <motion.div
          key={exp.role + exp.company}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="group"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              {exp.role}
            </h3>
            <span className="text-xs text-neutral-500">{exp.dates}</span>
          </div>
          <p className="text-sm text-accent">{exp.company}</p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            {exp.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-900 dark:text-neutral-500"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
