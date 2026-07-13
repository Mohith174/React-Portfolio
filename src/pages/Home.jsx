import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AboutSection from "../components/sections/AboutSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ChallengeSection from "../components/sections/ChallengeSection";
import ContactSection from "../components/sections/ContactSection";

const Home = () => {
  const { hash } = useLocation();

  // Scroll to the target section when arriving with a hash (e.g. back from a project).
  useEffect(() => {
    if (!hash) return;
    requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [hash]);

  return (
    <div className="lg:pl-[340px]">
      <Sidebar />
      <main className="mx-auto max-w-3xl px-6 pb-10 sm:px-10 lg:px-16">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ChallengeSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Home;
