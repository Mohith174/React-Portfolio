import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import SectionHeader from "../SectionHeader";
import { PROFILE } from "../../data/profile";

const CHANNELS = [
  { key: "email", label: "Email", value: PROFILE.links.email, href: `mailto:${PROFILE.links.email}`, Icon: HiOutlineMail },
  { key: "github", label: "GitHub", value: "github.com/Mohith174", href: PROFILE.links.github, Icon: FaGithub },
  { key: "linkedin", label: "LinkedIn", value: "in/mohitkodavati", href: PROFILE.links.linkedin, Icon: FaLinkedin },
];

const ContactSection = () => (
  <section id="contact" className="scroll-mt-24 py-16">
    <SectionHeader num="06" title="CONTACT" />
    <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
      Open to opportunities and always up for a good problem. The fastest ways to reach me:
    </p>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {CHANNELS.map(({ key, label, value, href, Icon }) => (
        <a
          key={key}
          href={href}
          target={key === "email" ? undefined : "_blank"}
          rel={key === "email" ? undefined : "noopener noreferrer"}
          className="group flex items-center gap-3 rounded-lg border border-neutral-200 bg-white/40 p-4 transition-colors hover:border-accent dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-accent"
        >
          <Icon className="text-xl text-neutral-500 transition-colors group-hover:text-accent" />
          <div className="min-w-0">
            <p className="text-xs text-neutral-500">{label}</p>
            <p className="truncate text-sm text-neutral-900 dark:text-neutral-200">{value}</p>
          </div>
        </a>
      ))}
    </div>
  </section>
);

export default ContactSection;
