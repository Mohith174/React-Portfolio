import { motion } from "framer-motion";

// The numbered "01 — ABOUT" heading used at the top of every section,
// echoing the terminal/index aesthetic of the sidebar nav.
const SectionHeader = ({ num, title }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="mb-10 flex items-baseline gap-4"
  >
    <span className="text-xs text-neutral-500">{num}</span>
    <h2 className="text-lg font-semibold tracking-wider text-neutral-900 dark:text-neutral-100">
      {title}
    </h2>
    <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
  </motion.div>
);

export default SectionHeader;
