import SectionHeader from "../SectionHeader";
import ProjectCard from "../ProjectCard";
import { PROJECTS } from "../../data/projects";

const ProjectsSection = () => (
  <section id="projects" className="scroll-mt-24 py-16">
    <SectionHeader num="03" title="PROJECTS" />
    <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
      Things I&rsquo;ve built end to end. Each one opens its own page with the problem,
      the architecture, and the decisions behind it.
    </p>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </div>
  </section>
);

export default ProjectsSection;
