import { motion } from "framer-motion";
import { PROJECTS } from "../data/projects";
import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  return (
    <div id="projects" className="scroll-mt-20 border-b border-neutral-200 py-16">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-center text-3xl font-semibold text-neutral-900"
      >
        Projects
      </motion.h1>
      <p className="mx-auto mb-12 max-w-lg text-center text-neutral-500">
        A few things I&rsquo;ve actually built end to end. Click through for the architecture and the decisions behind them.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
