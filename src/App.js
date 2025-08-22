import React from "react";
import Navbar from "./components/Navbar";
import DeviceMockup from "./components/DeviceMockup";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-white text-black scroll-smooth">
        <main>
          <Navbar />
          <DeviceMockup />
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