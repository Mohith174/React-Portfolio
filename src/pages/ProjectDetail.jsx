import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaArrowUpRightFromSquare, FaArrowLeft } from "react-icons/fa6";
import { PROJECTS, getProject } from "../data/projects";
import { StatusBadge } from "../components/ProjectCard";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <div className="py-24 text-center">
        <p className="text-neutral-500">No project found at &quot;{slug}&quot;.</p>
        <Link to="/" className="mt-4 inline-block text-accent underline">
          Back home
        </Link>
      </div>
    );
  }

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-10 sm:px-10">
      <Link
        to="/#projects"
        className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-accent"
      >
        <FaArrowLeft /> all projects
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            {project.title}
          </h1>
          <StatusBadge status={project.status} />
        </div>
        <p className="mb-6 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
          {project.tagline}
        </p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded border border-neutral-300 px-2 py-1 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-neutral-950 transition-transform hover:scale-105"
            >
              Live demo <FaArrowUpRightFromSquare />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-300"
            >
              <FaGithub /> Source
            </a>
          )}
        </div>
      </motion.div>

      <div className="mt-14 space-y-12">
        {/* Problem framing */}
        <section>
          <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">{project.problem}</p>
        </section>

        {/* Metrics */}
        {project.metrics && (
          <section className="flex flex-wrap gap-10">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-3xl font-bold text-accent">{m.value}</div>
                <div className="text-sm text-neutral-500">{m.label}</div>
              </div>
            ))}
          </section>
        )}

        {/* Architecture diagram */}
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-wider text-neutral-900 dark:text-neutral-100">Architecture</h2>
          <pre className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-6 text-xs leading-relaxed text-accent sm:text-sm">
            {project.diagram}
          </pre>
        </section>

        {/* Engineering decisions */}
        <section>
          <h2 className="mb-6 text-lg font-semibold tracking-wider text-neutral-900 dark:text-neutral-100">Key decisions</h2>
          <div className="space-y-4">
            {project.decisions.map((d) => (
              <div key={d.title} className="rounded-xl border border-neutral-200 bg-white/40 p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
                <h3 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">{d.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold tracking-wider text-neutral-900 dark:text-neutral-100">In action</h2>
            <div className="space-y-4">
              {project.screenshots.map((src) => (
                <img key={src} src={src} alt={`${project.title} screenshot`} className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800" />
              ))}
            </div>
          </section>
        )}

        {/* Stack table */}
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-wider text-neutral-900 dark:text-neutral-100">Stack</h2>
          <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-left text-sm">
              <tbody>
                {project.stack.map((row, i) => (
                  <tr
                    key={row.component}
                    className={i % 2 === 0 ? "bg-white/40 dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-900/70"}
                  >
                    <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-200">{row.component}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{row.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer nav */}
        <div className="flex items-center justify-between border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <Link to="/#projects" className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-200">
            ← all projects
          </Link>
          <Link to={`/projects/${next.slug}`} className="text-sm text-accent transition-colors hover:underline">
            next: {next.title} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
