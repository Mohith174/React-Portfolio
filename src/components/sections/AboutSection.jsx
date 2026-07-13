import SectionHeader from "../SectionHeader";
import { PROFILE } from "../../data/profile";

const Chip = ({ children }) => (
  <span className="rounded border border-neutral-300 px-2.5 py-1 text-xs text-neutral-600 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-400">
    {children}
  </span>
);

const AboutSection = () => (
  <section id="about" className="scroll-mt-24 py-16">
    <SectionHeader num="01" title="ABOUT" />
    <div className="space-y-4 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
      {PROFILE.about.map((p, i) => (
        <p key={i} className={i === PROFILE.about.length - 1 ? "text-neutral-900 dark:text-neutral-200" : ""}>
          {p}
        </p>
      ))}
    </div>

    <div className="mt-10">
      <p className="mb-3 text-xs tracking-wider text-neutral-500">TECHNOLOGIES</p>
      <div className="flex flex-wrap gap-2">
        {PROFILE.technologies.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </div>

    <div className="mt-8">
      <p className="mb-3 text-xs tracking-wider text-neutral-500">INTERESTS</p>
      <div className="flex flex-wrap gap-2">
        {PROFILE.interests.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
