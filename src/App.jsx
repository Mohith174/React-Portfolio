import logo from "./assets/logo.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-30 h-24" src={logo} alt="logo" />
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a 
          href="https://www.linkedin.com/in/mohitkodavati" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          <FaLinkedin />
        </a>
        <a 
          href="https://github.com/mohith174" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition-colors duration-300"
        >
          <FaGithub />
        </a>
        <a 
          href="https://twitter.com/Kodavati17" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors duration-300"
        >
          <FaSquareXTwitter />
        </a>
        <a 
          href="https://instagram.com/mohitkodavatii" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-colors duration-300"
        >
          <FaInstagram />
        </a>
      </div>
    </nav>
  );
};

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
