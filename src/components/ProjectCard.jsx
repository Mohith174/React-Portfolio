import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const STATUS_LABEL = {
  live: "live",
  showcase: "case study",
  building: "building",
};

const STATUS_CLASS = {
  live: "text-emerald-500",
  showcase: "text-sky-500",
  building: "text-amber-500",
};

export const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs ${STATUS_CLASS[status]}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {STATUS_LABEL[status]}
  </span>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.45, delay: index * 0.06 }}
  >
    <Link
      to={`/projects/${project.slug}`}
      className="group block rounded-lg border border-neutral-200 bg-white/40 p-5 transition-colors hover:border-accent dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-accent"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-neutral-900 transition-colors group-hover:text-accent dark:text-neutral-100">
          {project.title}
        </h3>
        <StatusBadge status={project.status} />
      </div>
      <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {project.summary}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
            {t}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-1 text-xs text-neutral-400 transition-all group-hover:gap-2 group-hover:text-accent">
          details <FaArrowRight className="text-[10px]" />
        </span>
      </div>
    </Link>
  </motion.div>
);

export default ProjectCard;
