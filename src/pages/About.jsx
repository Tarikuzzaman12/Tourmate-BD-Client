import React from "react";

const About = () => {
  const projects = [
    {
      name: "Lingo Bingo",
      description: "An interactive Italian vocabulary learning platform.",
      link: "https://encouraging-invention.surge.sh/",
    },
    {
      name: "Visa Compass",
      description: "A comprehensive visa navigator portal with advanced filtering, authentication, and CRUD functionality.",
      link: "https://visa-compass-pass-auth.web.app/",
    },
    {
      name: "StayEase",
      description: "A modern hotel booking platform with responsive design, user reviews, and filtering options.",
      link: "https://stayease-pass-auth.web.app/",
    },
  ];

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About the Developer</h2>
        <p className="text-gray-700 mb-4">
          Hi, I am <span className="font-semibold">Tarikuzzaman</span>, a passionate and motivated Junior Front-End Developer with expertise in React.js, HTML, CSS, and JavaScript. I strive to create visually appealing, responsive, and user-friendly web interfaces.
        </p>
        <p className="text-gray-700 mb-4">
          I have successfully completed a Diploma and am now dedicated to building impactful web applications. My portfolio showcases various projects, each reflecting my skills and creativity.
        </p>
        <h3 className="text-xl font-bold mb-2">Projects Completed</h3>
        <p className="text-gray-700 mb-4">I have worked on multiple projects, including:</p>
        <ul className="list-disc list-inside mb-4">
          {projects.map((project, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{project.name}</span> - {project.description}{" "}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Project
              </a>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mb-2">Connect With Me</h3>
        <p className="text-gray-700">
          Explore more about my work or connect with me:
        </p>
        <ul className="list-inside">
          <li>
            <a
              href="https://github.com/Tarikuzzaman12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/tarikuzzamantuhin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
