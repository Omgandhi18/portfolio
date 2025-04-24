import React from "react";
import ScrollReveal from "../Animations/ScrollReveal";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-stone-950 text-center py-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 font-montserrat">
      <ScrollReveal direction="up" delay={0.1} threshold={0.1}>
        <p>© {new Date().getFullYear()} Om Gandhi. All rights reserved.</p>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;