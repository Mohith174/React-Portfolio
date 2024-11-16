import { useState } from "react";
import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from "emailjs-com"; // Ensure this import is correct and the library is installed

const Contact = () => {
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  const [status, setStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_orx43dp',       // Your EmailJS Service ID, updated
      'template_1mobhdd',      // Your new EmailJS Template ID
      formData,
      'rGkW1h9mQcRzLp3l3'      // Your new EmailJS User ID (Public Key)
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setStatus('Email sent successfully!');
      setFormData({ user_name: '', user_email: '', message: '' }); // Clear form
    }).catch((error) => {
      console.log('FAILED...', error);
      setStatus('Failed to send email');
    });
  };

  return (
    <div className="border-b border-neutral-900 pb-20 text-white">
      <motion.h1 
        className="my-10 text-center text-4xl"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Contact Me
      </motion.h1>
      
      <div className="flex flex-col lg:flex-row justify-between items-start p-5 lg:p-10 gap-10">
        <div className="lg:w-1/2 mb-10 lg:mb-0 space-y-4">
          <h2 className="text-2xl mb-4">Get in touch</h2>
          <p><strong>Email:</strong> {CONTACT.email}</p>
          <p><strong>Phone:</strong> {CONTACT.phoneNo}</p>
          <p className="text-neutral-400">
            Available through text and email throughout the week, for calls, please send a message beforehand to schedule an appropriate time!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-4 ml-auto">
          <motion.input 
            type="text" 
            name="user_name"
            placeholder="Name" 
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white text-black font-bold"
            value={formData.user_name}
            onChange={handleChange}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
          />
          <motion.input 
            type="email" 
            name="user_email"
            placeholder="Email" 
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white text-black font-bold"
            value={formData.user_email}
            onChange={handleChange}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
          />
          <motion.textarea 
            name="message"
            placeholder="Message" 
            className="border p-2 w-full h-32 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white text-black"
            value={formData.message}
            onChange={handleChange}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
          />
          <div className="flex justify-end">
            <motion.button 
              type="submit" 
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send
              <motion.div 
                className="text-lg"
                initial={{ x: 0 }}
                animate={{ x: 10 }}
                transition={{ type: "tween", repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
              >
                <FaPaperPlane />
              </motion.div>
            </motion.button>
          </div>
          {status && <p className="text-center mt-4">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
