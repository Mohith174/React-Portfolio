import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

/**
 * Catch-all. Without one, an unmatched path renders a completely blank page,
 * because the SPA rewrite serves index.html for every URL and React Router then
 * matches nothing. That happened to /writing the moment its route was gated.
 *
 * noindex is set from here rather than in the HTML shell, so it applies only to
 * pages that actually resolve to nothing.
 */
const NotFound = () => (
  <div className="lg:pl-[340px]">
    <Sidebar />
    <div className="mx-auto max-w-2xl px-6 pb-20 pt-24 sm:px-10 lg:px-16">
      <p className="text-xs tracking-widest text-neutral-400">404</p>
      <h1 className="mt-3 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Nothing here.
      </h1>
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        That page doesn&rsquo;t exist, or it was taken down.
      </p>
      <Link to="/" className="mt-6 inline-block text-sm text-accent hover:underline">
        ← back home
      </Link>
    </div>
  </div>
);

export default NotFound;
