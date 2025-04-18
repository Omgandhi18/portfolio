import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 md:px-16 bg-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8">Let's Connect</h2>
        <p className="text-gray-600 mb-6 text-base sm:text-lg">
          Interested in working together, or just want to say hi? Feel free to reach out!
        </p>
        <div className="flex justify-center gap-8 text-2xl sm:text-3xl text-gray-700">
          <a 
            href="mailto:omkgandhi@outlook.com" 
            aria-label="Email"
            className="hover:text-blue-500 transition-colors transform hover:scale-110 duration-300"
          >
            <FaEnvelope />
          </a>
          <a 
            href="https://github.com/Omgandhi18" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub"
            className="hover:text-blue-500 transition-colors transform hover:scale-110 duration-300"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/gandhiom/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            className="hover:text-blue-500 transition-colors transform hover:scale-110 duration-300"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;