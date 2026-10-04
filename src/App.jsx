import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { IconContext } from "@phosphor-icons/react";
import { startLenis, stopLenis } from "./lib/lenis";
import Nav from "./components/Nav";
import Intro from "./components/Intro";
import CommandPalette from "./components/CommandPalette";
import Invocations from "./components/Invocations";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Works from "./components/sections/Works";
import Voyage from "./components/sections/Voyage";
import Contact from "./components/sections/Contact";

export default function App() {
  useEffect(() => {
    startLenis();
    return stopLenis;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <IconContext.Provider value={{ weight: "regular", size: 18 }}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <About />
          <Works />
          <Voyage />
          <Contact />
        </main>
        <CommandPalette />
        <Invocations />
        <Intro />
      </IconContext.Provider>
    </MotionConfig>
  );
}
