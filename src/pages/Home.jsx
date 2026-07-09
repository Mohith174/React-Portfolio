import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import Technologies from "../components/Technologies";
import Experience from "../components/Experience";
import ProjectsSection from "../components/ProjectsSection";
import Contact from "../components/Contact";

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Technologies />
      <Experience />
      <ProjectsSection />
      <Contact />
    </>
  );
};

export default Home;
