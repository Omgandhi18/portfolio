import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParticlesScene from "./components/ParticlesScene";

function App() {
  return (
    <div className="bg-transparent text-black scroll-smooth">
      <ParticlesScene/>
      <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
