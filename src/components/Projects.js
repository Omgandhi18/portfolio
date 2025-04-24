import React from "react";
import TransloImage from "../assets/Translo.png";
import CampusCoin from "../assets/CampusCoin.png";
import OGWeather from "../assets/OG Weather.png";
import SpotlightCard from "../Animations/SpotlightCard";
import ScrollReveal from "../Animations/ScrollReveal";

const projects = [
  {
    title: "Translo",
    description: "A language translation app using Google's MLKit to translate any text into over 50 languages.",
    imageUrl: TransloImage,
    link: "https://apps.apple.com/gb/app/translo/id6659895212",
  },
  {
    title: "Campus Coin",
    description: "Campus Coin is a simple and intuitive expense tracker designed for students.",
    imageUrl: CampusCoin,
    link: "https://apps.apple.com/gb/app/campus-coin/id6705128036",
  },
  {
    title: "OG Weather",
    description: "A weather app using CoreLocation and SceneKit to display weather using 3d Models",
    imageUrl: OGWeather,
    link: "https://github.com/Omgandhi18/WeatherAppNew",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 md:px-16 bg-white dark:bg-stone-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-7xl font-condiment mb-8 sm:mb-12 text-black dark:text-white">Projects</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ScrollReveal 
              key={project.title} 
              delay={0.2 + index * 0.1} 
              direction={index % 2 === 0 ? "up" : "down"}
            >
              <SpotlightCard spotlightColor="rgba(168, 218, 220, 0.25)">
                <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-6 font-montserrat">
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-3">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">{project.description}</p>
                  <a
                    href={project.link}
                    className="text-stone-950 dark:text-white hover:underline inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;