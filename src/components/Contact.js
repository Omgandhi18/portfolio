import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="py-16 px-6 md:px-16 bg-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Let’s Connect</h2>
        <p className="text-gray-600 mb-6">
          Interested in working together, or just want to say hi? Feel free to reach out!
        </p>
        <div className="flex justify-center gap-6 text-2xl text-gray-700">
          <a href="mailto:omkgandhi@outlook.com" aria-label="Email">
            <FaEnvelope className="hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://github.com/Omgandhi18" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/gandhiom/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="hover:text-blue-500 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
