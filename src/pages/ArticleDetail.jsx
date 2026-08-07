import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { ARTICLES, getArticle } from "../data/articles";

// Renders one structured block from an article body. Keeping the mapping here
// (rather than storing HTML in the data file) means typography stays consistent
// across every article and a block type can grow behaviour without touching prose.
const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-3 mt-12 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {block.text}
        </h2>
      );

    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-accent pl-5 text-lg font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
          {block.text}
        </blockquote>
      );

    case "stat":
      return (
        <div className="my-8 grid grid-cols-1 gap-4 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-900/40 sm:grid-cols-3">
          {block.items.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-accent">{s.value}</div>
              <div className="mt-1 text-xs leading-relaxed text-neutral-500">{s.label}</div>
            </div>
          ))}
        </div>
      );

    case "note":
      return (
        <div className="my-8 rounded-xl border border-amber-300/50 bg-amber-50/50 p-5 text-[14px] leading-relaxed text-neutral-700 dark:border-amber-700/40 dark:bg-amber-950/20 dark:text-neutral-300">
          {block.text}
        </div>
      );

    case "list":
      return (
        <ul className="my-6 space-y-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="border-l border-neutral-200 pl-4 text-[14px] leading-relaxed text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
            >
              {item}
            </li>
          ))}
        </ul>
      );

    default:
      return (
        <p className="mb-5 text-[16px] leading-[1.75] text-neutral-700 dark:text-neutral-300">
          {block.text}
        </p>
      );
  }
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="py-24 text-center">
        <p className="text-neutral-500">No article found at &quot;{slug}&quot;.</p>
        <Link to="/writing" className="mt-4 inline-block text-accent underline">
          All writing
        </Link>
      </div>
    );
  }

  const index = ARTICLES.findIndex((a) => a.slug === slug);
  const next = ARTICLES.length > 1 ? ARTICLES[(index + 1) % ARTICLES.length] : null;

  return (
    <div className="mx-auto max-w-2xl px-6 pb-20 pt-10 sm:px-10">
      <Link
        to="/writing"
        className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-accent"
      >
        <FaArrowLeft /> all writing
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
            <time dateTime={article.date}>{article.dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
            {article.tags?.map((t) => (
              <span
                key={t}
                className="rounded border border-neutral-300 px-2 py-0.5 dark:border-neutral-700"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {article.dek}
          </p>
        </header>

        <div>
          {article.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </motion.article>

      {article.companion && (
        <aside className="mt-14 rounded-xl border border-neutral-200 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
          <p className="mb-1 text-[10px] tracking-widest text-neutral-400">
            {article.companion.label.toUpperCase()}
          </p>
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            {article.companion.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {article.companion.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={article.companion.href}
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-neutral-950 transition-transform hover:scale-105"
            >
              Open the tracker <FaArrowUpRightFromSquare />
            </a>
            <a
              href={article.companion.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-300"
            >
              <FaGithub /> Source
            </a>
          </div>
        </aside>
      )}

      <div className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <Link
          to="/writing"
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-200"
        >
          ← all writing
        </Link>
        {next && next.slug !== article.slug && (
          <Link
            to={`/writing/${next.slug}`}
            className="text-sm text-accent transition-colors hover:underline"
          >
            next: {next.title} →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
