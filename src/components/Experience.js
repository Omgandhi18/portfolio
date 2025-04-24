import React from "react";
import experience from "../data/experience";
import ScrollReveal from "../Animations/ScrollReveal";

const Experience = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 px-4 sm:px-6 md:px-16 bg-white dark:bg-stone-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-7xl font-condiment mb-8 sm:mb-12 text-black dark:text-white">Experience</h2>
        </ScrollReveal>
        
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {experience.map((item, index) => (
            <ScrollReveal 
              key={index} 
              delay={0.2 + index * 0.1} 
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-4 sm:p-6 text-left transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-montserrat text-black dark:text-white">
                    {item.role} <span className="text-gray-500 dark:text-gray-300">@ {item.company}</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.duration}</p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base font-montserrat">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;