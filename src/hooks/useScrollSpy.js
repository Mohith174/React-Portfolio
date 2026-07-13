import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the sidebar nav can highlight
 * the active item. Uses a single IntersectionObserver keyed on the section
 * that occupies the middle band of the viewport.
 */
export const useScrollSpy = (ids, rootMargin = "-45% 0px -50% 0px") => {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin, threshold: 0 }
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
};
