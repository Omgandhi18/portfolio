import React from "react";
import experience from "../data/experience";

const Experience = () => {
  return (
    <section id="experience" className="py-16 px-6 md:px-16 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">Experience</h2>
        <div className="space-y-8">
          {experience.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold">{item.role} <span className="text-gray-500">@ {item.company}</span></h3>
              <p className="text-sm text-gray-500 mb-2">{item.duration}</p>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
