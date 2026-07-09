import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const STATUS_LABEL = {
  live: "Live",
  showcase: "Case study",
  building: "Actively building",
};

const STATUS_CLASS = {
  live: "bg-emerald-100 text-emerald-800",
  showcase: "bg-sky-100 text-sky-800",
  building: "bg-amber-100 text-amber-800",
};

export const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium font-mono ${STATUS_CLASS[status]}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {STATUS_LABEL[status]}
  </span>
);

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        className="group block h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow duration-200 will-change-transform hover:shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-xl font-semibold text-neutral-900">{project.title}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="mb-5 text-sm leading-relaxed text-neutral-600">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-600">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-1 text-sm font-medium text-purple-600 transition-transform duration-200 group-hover:translate-x-1">
          View case study →
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
