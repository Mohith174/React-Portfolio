import { motion } from "framer-motion";
import TerminalIntro from "./TerminalIntro";

const container = (delay) => ({
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, delay },
  },
});

const Hero = () => {
  return (
    <div className="border-b border-neutral-200 pb-16 pt-4 lg:pt-12">
      <div className="flex flex-wrap items-center gap-12 lg:flex-nowrap">
        <div className="w-full lg:w-1/2">
          <motion.h1
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-5xl font-semibold tracking-tight text-neutral-900 lg:text-7xl"
          >
            Mohith Kodavati
          </motion.h1>

          <motion.div
            variants={container(0.15)}
            initial="hidden"
            animate="visible"
            className="mt-4 font-mono text-lg text-purple-600"
          >
            Python-First, AI-Native Software Engineer — Agentic Systems · Spring Boot
          </motion.div>

          <motion.div
            variants={container(0.3)}
            initial="hidden"
            animate="visible"
            className="my-6 max-w-xl space-y-4 text-lg leading-relaxed text-neutral-600"
          >
            <p>
              I&apos;m a Python-first, AI-native software engineer: I build agentic systems — LLM agents that call
              tools and act on real data, not just chat — on strong fundamentals in data pipelines, REST APIs, and
              system design.
            </p>
            <p>
              Spring Boot and Java are my strong secondary stack, for backend services that need to be
              production-grade from day one. I move fluidly between Python and Java depending on what the system
              actually needs, and I pick up new agentic frameworks and tooling as they ship rather than waiting for
              them to settle.
            </p>
            <p>
              I&apos;m targeting AI Engineer, Backend Engineer, and Software Engineer roles building agentic or
              backend systems that survive real usage, not just demos.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex w-full justify-center lg:w-1/2"
        >
          <TerminalIntro />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
