import React from "react";
import experience from "../data/experience";

const Experience = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 px-4 sm:px-6 md:px-16 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-12">Experience</h2>
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {experience.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-left transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {item.role} <span className="text-gray-500">@ {item.company}</span>
                </h3>
                <p className="text-sm text-gray-500">{item.duration}</p>
              </div>
              <p className="text-gray-700 text-sm sm:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;