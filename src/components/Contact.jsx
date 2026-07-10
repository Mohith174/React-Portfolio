import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from "emailjs-com";

const CONTACT = {
  address: "Dallas, TX · Open to relocate / remote",
  phoneNo: "+1 (803) 908-9898",
  email: "mohitkod178@gmail.com",
};

const Contact = () => {
  const [formData, setFormData] = useState({ user_name: "", user_email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send("service_orx43dp", "template_1mobhdd", formData, "rGkW1h9mQcRzLp3l3")
      .then(() => {
        setStatus("Message sent. I'll get back to you soon.");
        setFormData({ user_name: "", user_email: "", message: "" });
      })
      .catch(() => {
        setStatus("Something went wrong. Try emailing me directly instead.");
      });
  };

  return (
    <div id="contact" className="scroll-mt-20 py-16">
      <motion.h1
        className="mb-12 text-center text-3xl font-semibold text-neutral-900"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Contact Me
      </motion.h1>

      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
        <div className="space-y-4 lg:w-1/2">
          <h2 className="mb-4 text-2xl font-semibold text-neutral-900">Get in touch</h2>
          <p className="text-neutral-700">
            <strong className="text-neutral-900">Location:</strong> {CONTACT.address}
          </p>
          <p className="text-neutral-700">
            <strong className="text-neutral-900">Email:</strong> {CONTACT.email}
          </p>
          <p className="text-neutral-700">
            <strong className="text-neutral-900">Phone:</strong> {CONTACT.phoneNo}
          </p>
          <p className="text-neutral-500">
            Available through text and email throughout the week. For calls, send a message beforehand to schedule a time.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ml-auto space-y-4 lg:w-1/2">
          <motion.input
            type="text"
            name="user_name"
            placeholder="Name"
            className="w-full rounded-lg border border-neutral-300 p-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={formData.user_name}
            onChange={handleChange}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            required
          />
          <motion.input
            type="email"
            name="user_email"
            placeholder="Email"
            className="w-full rounded-lg border border-neutral-300 p-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={formData.user_email}
            onChange={handleChange}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            required
          />
          <motion.textarea
            name="message"
            placeholder="Message"
            className="h-32 w-full rounded-lg border border-neutral-300 p-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={formData.message}
            onChange={handleChange}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            required
          />
          <div className="flex justify-end">
            <motion.button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send
              <motion.div
                className="text-lg"
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <FaPaperPlane />
              </motion.div>
            </motion.button>
          </div>
          {status && <p className="mt-4 text-center text-sm text-neutral-600">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
