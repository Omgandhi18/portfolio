import React from "react";
import SpotlightCard from "../Animations/SpotlightCard";
import ScrollReveal from "../Animations/ScrollReveal";

const About = () => {
  return (
    <section
      id="about"
      className="py-12 sm:py-16 px-4 sm:px-6 md:px-16 bg-white dark:bg-stone-950 text-black dark:text-white"
    >
      <div className="max-w-7xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-7xl font-condiment mb-6 sm:mb-8">
            About Me
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white mb-8 max-w-3xl mx-auto font-montserrat">
            Hi! I'm Om, a passionate developer and designer who loves to
            create beautiful and functional digital experiences. With a strong
            background in both front-end and mobile application development, I am always
            looking for new challenges that allow me to grow and make an impact.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <ScrollReveal direction="left" delay={0.3}>
            <SpotlightCard 
              className="mx-auto w-full" 
              spotlightColor="rgba(14, 165, 233, 0.15)"
            >
              <div className="text-gray-800 dark:text-white font-montserrat">
                <h3 className="text-xl sm:text-2xl mb-4">Skills</h3>
                <ul className="text-base sm:text-lg text-gray-800 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">🌐</span>
                    <span>Front-end Development (React)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📱</span>
                    <span>iOS Development (SwiftUI, Swift)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🧠</span>
                    <span>UX/UI Design (Figma)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💾</span>
                    <span>Database Management (Firebase)</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={0.4}>
            <SpotlightCard 
              className="mx-auto w-full" 
              spotlightColor="rgba(244, 114, 182, 0.15)"
            >
              <div className="text-gray-800 dark:text-white font-montserrat">
                <h3 className="text-xl sm:text-2xl font-medium mb-4">Hobbies</h3>
                <ul className="text-base sm:text-lg text-gray-800 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">🎮</span>
                    <span>Gaming</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🎬</span>
                    <span>Watching Movies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✈️</span>
                    <span>Traveling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📖</span>
                    <span>Reading Books</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;