import aboutImg from "../assets/about-me.jpg";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="border-b border-neutral-200 py-16">
      <h1 className="mb-12 text-center text-3xl font-semibold text-neutral-900">
        About <span className="text-purple-600">Me</span>
      </h1>
      <div className="flex flex-wrap items-center gap-8">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -60 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/4"
        >
          <div className="flex items-center justify-center lg:justify-start">
            <motion.img
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-48 rounded-2xl shadow-lg lg:w-full"
              src={aboutImg}
              alt="Mohith Kodavati"
            />
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 60 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-3/4"
        >
          <div className="max-w-xl space-y-4 text-lg leading-relaxed text-neutral-700">
            <p>
              I&apos;m a recent Computer Science and Data Science (statistics focus) graduate from Rutgers
              University–New Brunswick, based in Dallas and open to opportunities anywhere.
            </p>
            <p>
              I&apos;m Python-first and AI-native: I build agentic systems — LLM agents wired to real tools instead
              of free-form chat — and back that with production-grade backend engineering in Spring Boot and Java. I
              came up building full-stack products (React, Next.js, Node.js, Postgres, MongoDB) and freelancing
              early, which taught me to build for changing requirements instead of ideal ones.
            </p>
            <p>Outside of engineering: weightlifting, MMA, cooking, guitar.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
