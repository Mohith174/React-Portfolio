import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaArrowUpRightFromSquare, FaArrowLeft } from "react-icons/fa6";
import { PROJECTS, getProject } from "../data/projects";
import { StatusBadge } from "../components/ProjectCard";
import GraphBackground from "../components/GraphBackground";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <div className="py-24 text-center">
        <p className="text-neutral-600">No project found at &quot;{slug}&quot;.</p>
        <Link to="/" className="mt-4 inline-block text-purple-600 underline">
          Back home
        </Link>
      </div>
    );
  }

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="pb-16">
      {/* Dark terminal banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative -mx-8 mb-12 overflow-hidden rounded-b-3xl bg-neutral-950 px-8 py-16 text-white sm:px-16"
      >
        <GraphBackground className="opacity-60" />
        <div className="relative mx-auto max-w-3xl">
          <Link to="/#projects" className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white">
            <FaArrowLeft /> All projects
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="font-mono text-3xl font-bold sm:text-4xl">{project.title}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="mb-6 max-w-xl text-lg text-neutral-300">{project.tagline}</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-md border border-neutral-700 px-2 py-1 font-mono text-xs text-neutral-300">
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
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-transform hover:scale-105"
              >
                Live demo <FaArrowUpRightFromSquare />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-500"
              >
                <FaGithub /> Source
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-12">
        {/* Problem framing */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-lg leading-relaxed text-neutral-700">{project.problem}</p>
        </motion.section>

        {/* Metrics */}
        {project.metrics && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-8"
          >
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-mono text-3xl font-bold text-purple-600">{m.value}</div>
                <div className="text-sm text-neutral-500">{m.label}</div>
              </div>
            ))}
          </motion.section>
        )}

        {/* Architecture diagram */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="mb-4 text-2xl font-semibold text-neutral-900">Architecture</h2>
          <pre className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-6 font-mono text-xs leading-relaxed text-cyan-300 sm:text-sm">
            {project.diagram}
          </pre>
        </motion.section>

        {/* Engineering decisions */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="mb-6 text-2xl font-semibold text-neutral-900">Key decisions</h2>
          <div className="space-y-6">
            {project.decisions.map((d) => (
              <div key={d.title} className="rounded-xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-neutral-900">{d.title}</h3>
                <p className="text-neutral-600">{d.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900">In action</h2>
            <div className="space-y-4">
              {project.screenshots.map((src) => (
                <img key={src} src={src} alt={`${project.title} screenshot`} className="w-full rounded-xl border border-neutral-200 shadow-md" />
              ))}
            </div>
          </motion.section>
        )}

        {/* Stack table */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="mb-4 text-2xl font-semibold text-neutral-900">Stack</h2>
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            <table className="w-full text-left text-sm">
              <tbody>
                {project.stack.map((row, i) => (
                  <tr key={row.component} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                    <td className="px-4 py-3 font-medium text-neutral-900">{row.component}</td>
                    <td className="px-4 py-3 font-mono text-neutral-600">{row.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Footer nav */}
        <div className="flex items-center justify-between border-t border-neutral-200 pt-8">
          <Link to="/#projects" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
            ← All projects
          </Link>
          <Link to={`/projects/${next.slug}`} className="text-sm font-medium text-purple-600 hover:text-purple-800">
            Next: {next.title} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
