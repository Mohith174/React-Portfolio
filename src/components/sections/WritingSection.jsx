import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { ARTICLES } from "../../data/articles";

const WritingSection = () => (
  <section id="writing" className="scroll-mt-24 py-16">
    <SectionHeader num="04" title="WRITING" />
    <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
      Pieces where I went and got the data rather than reacting to the headline. Each one
      opens on its own page.
    </p>

    <div className="space-y-2">
      {ARTICLES.map((a, i) => (
        <motion.div
          key={a.slug}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 * i }}
        >
          <Link
            to={`/writing/${a.slug}`}
            className="group block rounded-xl border border-neutral-200 bg-white/40 p-5 transition-colors hover:border-accent dark:border-neutral-800 dark:bg-neutral-900/40"
          >
            <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
              <time dateTime={a.date}>{a.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{a.readingTime}</span>
            </div>
            <h3 className="font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-accent dark:text-neutral-100">
              {a.title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              {a.dek}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>

    {ARTICLES.length > 1 && (
      <Link to="/writing" className="mt-6 inline-block text-sm text-accent hover:underline">
        all writing →
      </Link>
    )}
  </section>
);

export default WritingSection;
