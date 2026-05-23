import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Loader />
      <Cursor />
      <div className="bg-bg text-white">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
