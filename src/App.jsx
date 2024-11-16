import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const App = () => {
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 min-h-screen flex flex-col">
      {/* Full-page background gradient */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-neutral-950 bg-[radial-gradient(circle_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Main container */}
      <div className="container mx-auto px-8">
        <Navbar />
        <Hero />
        <About />
        <Technologies />
        <Experience />
        <Projects />
        <Contact />
        
      </div>
    </div>
  );
};

export default App;
