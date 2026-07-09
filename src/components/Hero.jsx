import { HERO_CONTENT } from "../constants";
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
            Backend Software Engineer — Java · Spring · AI systems
          </motion.div>

          <motion.p
            variants={container(0.3)}
            initial="hidden"
            animate="visible"
            className="my-6 max-w-xl text-lg leading-relaxed text-neutral-600"
          >
            {HERO_CONTENT}
          </motion.p>
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
