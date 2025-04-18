import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-6 text-xs sm:text-sm text-gray-600">
      <p>© {new Date().getFullYear()} Om Gandhi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;