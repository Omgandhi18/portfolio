import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import ModernBackground from "./Animations/ModernBackground";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-stone-950 text-black dark:text-white scroll-smooth">
        <main>
          <Navbar />
          <div className="relative">
            {/* Modern 3D Background positioned absolutely to cover the hero area */}
            <div className="absolute inset-0 z-0" style={{ height: '100vh' }}>
              <ModernBackground />
            </div>
            
            {/* Hero section with higher z-index to appear above background */}
            <div className="relative z-10">
              <Hero />
            </div>
          </div>
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;