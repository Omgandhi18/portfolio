import React, { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const isDarkMode = false; // Fixed to light theme
  
  // Always ensure light theme is applied
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);
  
  // No-op function for compatibility with existing components
  const toggleTheme = () => {
    // Theme is fixed to light, so no toggle action
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);