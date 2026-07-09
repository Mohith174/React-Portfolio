import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb, SiApachekafka, SiNeo4J } from "react-icons/si";
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
  { Icon: FaJava, color: "text-orange-600", duration: 2.5 },
  { Icon: RiReactjsLine, color: "text-cyan-500", duration: 2.5 },
  { Icon: TbBrandNextjs, color: "text-neutral-800", duration: 3 },
  { Icon: SiApachekafka, color: "text-neutral-800", duration: 2 },
  { Icon: SiNeo4J, color: "text-sky-600", duration: 4 },
  { Icon: FaNodeJs, color: "text-green-600", duration: 6 },
  { Icon: BiLogoPostgresql, color: "text-sky-700", duration: 4 },
  { Icon: SiMongodb, color: "text-green-600", duration: 2.5 },
];

const Technologies = () => {
  return (
    <div className="border-b border-neutral-200 py-16">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center text-3xl font-semibold text-neutral-900"
      >
        Technologies
      </motion.h1>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {ICONS.map(({ Icon, color, duration }, i) => (
          <motion.div
            key={i}
            variants={iconVariants(duration)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-2 border-neutral-200 bg-white p-4 shadow-sm"
          >
            <Icon className={`text-6xl ${color}`} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technologies;
