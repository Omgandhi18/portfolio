import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="py-12 sm:py-16 px-4 sm:px-6 md:px-16 bg-gray-100 text-black"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8">
          About Me
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Hi! I'm Om, a passionate developer and designer who loves to
          create beautiful and functional digital experiences. With a strong
          background in both front-end and mobile application development, I am always
          looking for new challenges that allow me to grow and make an impact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl sm:text-2xl font-medium mb-4">Skills</h3>
            <ul className="text-base sm:text-lg text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">🌐</span>
                <span>Front-end Development (React, Tailwind CSS)</span>
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
                <span>Database Management (MongoDB, Firebase)</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl sm:text-2xl font-medium mb-4">Hobbies</h3>
            <ul className="text-base sm:text-lg text-gray-700 space-y-2">
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
        </div>
      </div>
    </section>
  );
};

export default About;