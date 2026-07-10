import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb, SiApachekafka, SiNeo4J, SiSpring, SiDocker, SiPython, SiTypescript, SiRedis, SiFastapi } from "react-icons/si";
import { FaNodeJs, FaJava } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { motion } from "framer-motion";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const ICONS = [
  { Icon: FaJava, label: "Java", color: "text-orange-600", duration: 2.5 },
  { Icon: SiSpring, label: "Spring Boot", color: "text-green-600", duration: 3.5 },
  { Icon: SiPython, label: "Python", color: "text-blue-500", duration: 3 },
  { Icon: SiTypescript, label: "TypeScript", color: "text-blue-600", duration: 2.8 },
  { Icon: RiReactjsLine, label: "React", color: "text-cyan-500", duration: 2.5 },
  { Icon: TbBrandNextjs, label: "Next.js", color: "text-neutral-800", duration: 3 },
  { Icon: FaNodeJs, label: "Node.js", color: "text-green-600", duration: 6 },
  { Icon: BiLogoPostgresql, label: "PostgreSQL", color: "text-sky-700", duration: 4 },
  { Icon: SiMongodb, label: "MongoDB", color: "text-green-600", duration: 2.5 },
  { Icon: SiRedis, label: "Redis", color: "text-red-500", duration: 3.2 },
  { Icon: SiApachekafka, label: "Kafka", color: "text-neutral-800", duration: 2 },
  { Icon: SiNeo4J, label: "Neo4j", color: "text-sky-600", duration: 4 },
  { Icon: SiFastapi, label: "FastAPI", color: "text-teal-600", duration: 3.6 },
  { Icon: SiDocker, label: "Docker", color: "text-blue-500", duration: 4.4 },
];

const Technologies = () => {
  return (
    <div className="border-b border-neutral-200 py-16">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-2 text-center text-3xl font-semibold text-neutral-900"
      >
        Technologies
      </motion.h1>
      <p className="mb-12 text-center text-sm text-neutral-500">
        Currently spending most of my learning time on agentic AI tooling on top of these.
      </p>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {ICONS.map(({ Icon, label, color, duration }, i) => (
          <motion.div
            key={i}
            variants={iconVariants(duration)}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.15, y: -14 }}
            className="flex flex-col items-center gap-2 rounded-2xl border-2 border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <Icon className={`text-5xl ${color}`} />
            <span className="font-mono text-xs text-neutral-500">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technologies;
