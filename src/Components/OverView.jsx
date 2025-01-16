import React from "react";

const OverView = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Discover the Features of Our Website
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Explore what makes our platform unique and user-friendly. Watch the video to learn more!
        </p>
      </div>

      {/* Video Section */}
      <div className="mt-8 max-w-5xl mx-auto">
        <div className="relative  ">
          <iframe
            className="rounded-lg shadow-lg w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Website Overview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="mt-8 text-center">
        <a
          href="#features"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-700"
        >
          Explore Features
        </a>
        <a
          href="#get-started"
          className="ml-4 inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-gray-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default OverView;
