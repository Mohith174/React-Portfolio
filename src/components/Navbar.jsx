import logo from "../assets/logo.png" //change logo, maybe text
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

const Navbar = () => {

    return (
        <nav className='mb-20 flex items-center justify-between py-6'>
          <div className='flex flex-shrink-0 items-center'>
            <img className="mx-2 w-10" src={logo} alt="logo" />
          </div>

          <div className="m-8 flex items-center justify-center gap-4 text-2xl">
            <a href="https://www.linkedin.com/in/mohitkodavati"><FaLinkedin /></a>
            <a href="https://github.com/mohith174"><FaGithub /></a>
            <a href="https://www.instagram.com/mohit4president/"><FaInstagram /></a>
            <a href="tel:+8039089898"><FaPhone /></a>
            
          </div>


        </nav>
      );
    }

export default Navbar

