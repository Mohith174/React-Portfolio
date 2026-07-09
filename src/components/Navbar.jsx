import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="mb-12 flex items-center justify-between py-6">
      <Link to="/" className="font-mono text-lg font-semibold tracking-tight text-neutral-900">
        mohith<span className="text-purple-600">.</span>dev
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/#projects" className="hidden text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:inline">
          Projects
        </Link>
        <Link to="/#contact" className="hidden text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:inline">
          Contact
        </Link>
        <div className="flex items-center gap-4 text-xl text-neutral-500">
          <a
            href="https://www.linkedin.com/in/mohitkodavati"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-blue-600"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Mohith174"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-neutral-900"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/Kodavati17"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-neutral-900"
          >
            <FaSquareXTwitter />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
