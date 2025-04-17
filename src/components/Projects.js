import React from "react";
import TransloImage from "../assets/Translo.png"; // Update path based on your structure
import CampusCoin from "../assets/CampusCoin.png";
import OGWeather from "../assets/OG Weather.png";


const projects = [
  {
    title: "Translo",
    description: "A language translation app using Google's MLKit to translate any text into over 50 languages.",
    imageUrl: TransloImage, // Replace with your project image
    link: "https://apps.apple.com/gb/app/translo/id6659895212", // Replace with your project link
  },
  {
    title: "Campus Coin",
    description: "Campus Coin is a simple and intuitive expense tracker designed for students.",
    imageUrl: CampusCoin, // Replace with your project image
    link: "https://apps.apple.com/gb/app/campus-coin/id6705128036",
  },
  {
    title: "OG Weather",
    description: "A weather app using CoreLocation and SceneKit to display weather using 3d Models",
    imageUrl: OGWeather, // Replace with your project image
    link: "https://github.com/Omgandhi18/WeatherAppNew",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-4">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
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
