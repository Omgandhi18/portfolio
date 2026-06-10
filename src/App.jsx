import { MotionConfig } from "framer-motion";
import Backdrop from "./components/Backdrop";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ethos from "./components/Ethos";
import Arithmoi from "./components/Arithmoi";
import Works from "./components/Works";
import Poreia from "./components/Poreia";
import Contact from "./components/Contact";
import CommandPalette from "./components/CommandPalette";
import Invocation from "./components/Invocation";
import RealmGates from "./components/RealmGates";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Backdrop />
      <Nav />
      <main id="main">
        <Hero />
        <Ethos />
        <Arithmoi />
        <Works />
        <Poreia />
        <Contact />
      </main>
      <CommandPalette />
      <Invocation />
      <RealmGates />
    </MotionConfig>
  );
}
