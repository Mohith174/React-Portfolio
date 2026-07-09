import aboutImg from "../assets/about-me.jpg";
import { ABOUT_TEXT } from "../constants";
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
          className="w-full lg:w-2/5"
        >
          <div className="flex items-center justify-center">
            <img className="rounded-2xl shadow-lg" src={aboutImg} alt="Mohith Kodavati" />
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 60 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-3/5"
        >
          <p className="max-w-xl text-lg leading-relaxed text-neutral-700">{ABOUT_TEXT}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
