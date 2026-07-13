import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaAward, FaCertificate, FaUsers } from "react-icons/fa6";
import SectionHeader from "../SectionHeader";
import { EDUCATION, STATS, CERTIFICATIONS, AWARDS, LEADERSHIP } from "../../data/recognition";

// Counts up to a target value once scrolled into view.
const StatCounter = ({ stat }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setVal(stat.value * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  return (
    <div ref={ref}>
      <div className="text-2xl font-bold text-accent">
        {stat.display && val >= stat.value ? stat.display : val.toFixed(stat.decimals)}
      </div>
      <div className="text-xs text-neutral-500">{stat.label}</div>
    </div>
  );
};

const List = ({ icon: Icon, title, items }) => (
  <div>
    <p className="mb-3 flex items-center gap-2 text-xs tracking-wider text-neutral-500">
      <Icon className="text-accent" /> {title}
    </p>
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it.name || it.role} className="text-sm">
          <span className="text-neutral-900 dark:text-neutral-200">{it.name || it.role}</span>
          {(it.note || it.dates) && (
            <span className="text-neutral-500"> · {it.note || it.dates}</span>
          )}
          {it.summary && (
            <p className="mt-0.5 text-[13px] leading-relaxed text-neutral-500">{it.summary}</p>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const RecognitionSection = () => (
  <section id="recognition" className="scroll-mt-24 py-14">
    <SectionHeader num="05" title="RECOGNITION" />

    {/* Education line */}
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <div>
        <p className="font-semibold text-neutral-900 dark:text-neutral-100">{EDUCATION.degree}</p>
        <p className="text-sm text-accent">{EDUCATION.school}</p>
      </div>
      <span className="text-xs text-neutral-500">{EDUCATION.grad}</span>
    </div>

    {/* Animated stat strip */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mb-10 flex flex-wrap gap-x-12 gap-y-4 rounded-lg border border-neutral-200 bg-white/40 p-5 dark:border-neutral-800 dark:bg-neutral-900/40"
    >
      {STATS.map((s) => (
        <StatCounter key={s.label} stat={s} />
      ))}
    </motion.div>

    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
      <List icon={FaCertificate} title="CERTIFICATIONS" items={CERTIFICATIONS} />
      <List icon={FaAward} title="AWARDS" items={AWARDS} />
    </div>

    <div className="mt-10">
      <List icon={FaUsers} title="LEADERSHIP" items={LEADERSHIP} />
    </div>
  </section>
);

export default RecognitionSection;
