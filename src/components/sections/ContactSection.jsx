import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import SectionHeader from "../SectionHeader";
import { PROFILE } from "../../data/profile";

// EmailJS config. Service ID confirmed by owner; template + public key should
// belong to the SAME EmailJS account as this service — update if they differ.
const EMAILJS = { service: "service_6uvinha", template: "template_1mobhdd", key: "rGkW1h9mQcRzLp3l3" };

const LINKS = [
  { key: "email", label: "email", href: `mailto:${PROFILE.links.email}`, Icon: HiOutlineMail, external: false },
  { key: "github", label: "github", href: PROFILE.links.github, Icon: FaGithub, external: true },
  { key: "linkedin", label: "linkedin", href: PROFILE.links.linkedin, Icon: FaLinkedin, external: true },
];

const ContactSection = () => {
  const [form, setForm] = useState({ user_name: "", user_email: "", message: "" });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
  const formRef = useRef(null);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    // sendForm maps the inputs' `name` attributes to the template variables.
    emailjs
      .sendForm(EMAILJS.service, EMAILJS.template, formRef.current, { publicKey: EMAILJS.key })
      .then(() => {
        setStatus("sent");
        setForm({ user_name: "", user_email: "", message: "" });
      })
      .catch((err) => {
        // Surface the real reason (bad service/template/key, blocked, etc.).
        console.error("EmailJS send failed:", err?.text || err);
        setStatus("error");
      });
  };

  const inputCls =
    "w-full rounded-lg border border-neutral-300 bg-white/60 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-accent dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-100";

  return (
    <section id="contact" className="scroll-mt-24 py-14">
      <SectionHeader num="05" title="CONTACT" />
      <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        Always interested in hearing about new projects and opportunities. Reach out directly, or
        drop a note below.
      </p>

      {/* Primary channels */}
      <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
        {LINKS.map(({ key, label, href, Icon, external }) => (
          <a
            key={key}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-2 text-sm text-neutral-700 transition-colors hover:text-accent dark:text-neutral-300"
          >
            <Icon className="text-neutral-400 transition-colors group-hover:text-accent" />
            {label}
          </a>
        ))}
      </div>

      {/* Message form */}
      <p className="mb-4 text-xs tracking-wider text-neutral-500">SEND A MESSAGE</p>
      <form ref={formRef} onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            className={inputCls}
            name="user_name"
            placeholder="name"
            value={form.user_name}
            onChange={onChange}
            required
          />
          <input
            className={inputCls}
            type="email"
            name="user_email"
            placeholder="email"
            value={form.user_email}
            onChange={onChange}
            required
          />
        </div>
        <textarea
          className={`${inputCls} min-h-[120px] resize-y`}
          name="message"
          placeholder="your message"
          value={form.message}
          onChange={onChange}
          required
        />
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "sending" ? "sending…" : "send"}
            <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </button>
          {status === "sent" && (
            <span className="text-sm text-emerald-500">thanks — I&rsquo;ll get back to you.</span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-500">
              something went wrong — email me directly at {PROFILE.links.email}.
            </span>
          )}
        </div>
      </form>

      {/* Footer */}
      <div className="mt-16 flex items-center justify-end border-t border-neutral-200 pt-6 text-xs text-neutral-500 dark:border-neutral-800">
        <span>© 2026 Mohith Kodavati</span>
      </div>
    </section>
  );
};

export default ContactSection;
