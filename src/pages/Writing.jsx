import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";
import { ARTICLES } from "../data/articles";

const Writing = () => (
  <div className="mx-auto max-w-2xl px-6 pb-20 pt-10 sm:px-10">
    <Link
      to="/"
      className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-accent"
    >
      <FaArrowLeft /> home
    </Link>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
        Writing
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        Pieces where I went and got the data rather than reacting to the headline. Usually
        there is a thing I built underneath.
      </p>
    </motion.div>

    <div className="mt-12 space-y-2">
      {ARTICLES.map((a, i) => (
        <motion.div
          key={a.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 * i }}
        >
          <Link
            to={`/writing/${a.slug}`}
            className="group block rounded-xl border border-neutral-200 bg-white/40 p-6 transition-colors hover:border-accent dark:border-neutral-800 dark:bg-neutral-900/40"
          >
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
              <time dateTime={a.date}>{a.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{a.readingTime}</span>
              {a.tags?.map((t) => (
                <span key={t} className="rounded border border-neutral-300 px-2 py-0.5 dark:border-neutral-700">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="text-lg font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-accent dark:text-neutral-100">
              {a.title}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              {a.dek}
            </p>
            <span className="mt-3 inline-block text-sm text-accent">read →</span>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Writing;
