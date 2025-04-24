import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-stone-950 text-center py-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 font-montserrat">
      <p>© {new Date().getFullYear()} Om Gandhi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;