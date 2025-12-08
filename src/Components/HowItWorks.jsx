import React from "react";
import { FaUserPlus, FaTasks, FaChartLine } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus size={40} className="text-blue-600" />,
      title: "Add Employees & Assets",
      desc: "Easily add your company's employees and all assets into AssetVerse.",
    },
    {
      icon: <FaTasks size={40} className="text-blue-600" />,
      title: "Assign Assets",
      desc: "Allocate assets to employees seamlessly and manage access rights.",
    },
    {
      icon: <FaChartLine size={40} className="text-blue-600" />,
      title: "Track & Report",
      desc: "Monitor asset usage and generate reports to optimize resources.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How <span className="text-blue-600">AssetVerse</span> Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
