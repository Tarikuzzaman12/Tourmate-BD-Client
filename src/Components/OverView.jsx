import React from "react";
import { motion } from "framer-motion";

const Overview = () => {
  const features = [
    "Secure User Authentication",
    "Admin Dashboard for Management",
    "Booking System",
    "Integrated Payment Gateway",
    "Role-Based Access Control",
    "Responsive Design",
    "Search and Filter Options",
    "Real-Time Notifications",
    "Interactive Animations",
    "Pagination for Data Tables",
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-700 mb-6">
            Explore the key features of our web application, designed to enhance
            user experience and ensure seamless functionality.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
