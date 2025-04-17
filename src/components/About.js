import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="py-8 px-6 md:px-16 bg-gray-100 text-black"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          About Me
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Hi! I'm Om, a passionate developer and designer who loves to
          create beautiful and functional digital experiences. With a strong
          background in both front-end and mobile application development, I am always
          looking for new challenges that allow me to grow and make an impact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-medium mb-4 text-left">Skills</h3>
            <ul className="text-lg text-gray-700 space-y-2 text-left">
              <li>🌐 Front-end Development (React, Tailwind CSS)</li>
              <li>📱 iOS Development (SwiftUI, Swift)</li>
              <li>🧠 UX/UI Design (Figma)</li>
              <li>💾 Database Management (MongoDB, Firebase)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-medium mb-4 text-left">Hobbies</h3>
            <ul className="text-lg text-gray-700 space-y-2 text-left">
              <li>🎮 Gaming</li>
              <li>🎬 Watching Movies</li>
              <li>✈️ Traveling</li>
              <li>📖 Reading Books</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
