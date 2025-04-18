import React from "react";
import TransloImage from "../assets/Translo.png";
import CampusCoin from "../assets/CampusCoin.png";
import OGWeather from "../assets/OG Weather.png";

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
    <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-12">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-black mb-3">{project.title}</h3>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">{project.description}</p>
                <a
                  href={project.link}
                  className="text-blue-500 hover:underline inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;