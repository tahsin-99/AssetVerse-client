import React from "react";
import FeaturesSection from "../Components/FeaturesSection";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <title>AssetVerse | About</title>

      {/* Header */}
      <h1 className="mt-20 text-4xl sm:text-5xl font-bold text-blue-900 dark:text-blue-400 p-5 text-center">
        About Us
      </h1>

      {/* Description */}
      <p className="max-w-5xl mx-auto text-lg sm:text-xl mt-10 p-5 text-gray-800 dark:text-gray-200 leading-relaxed">
        Our organization is dedicated to providing a comprehensive and reliable
        asset management solution designed to meet the evolving needs of modern
        institutions and businesses. The platform enables organizations to
        efficiently track, manage, and maintain their assets through a
        centralized and secure system, ensuring accuracy, transparency, and
        operational consistency across all departments. By automating
        asset-related processes, our system significantly reduces manual
        workloads, minimizes the risk of errors, and improves overall
        efficiency. Features such as role-based access control, real-time asset
        updates, detailed records, and structured data management allow
        administrators to maintain full oversight while ensuring accountability
        at every level of the organization. The platform has been developed with
        a strong emphasis on usability and scalability. Its intuitive interface
        ensures ease of use for both administrative and general users, while the
        underlying architecture supports organizational growth and increasing
        data volumes. Security and data integrity remain core priorities,
        ensuring that sensitive information is protected in accordance with best
        practices. Our objective is to empower organizations with a dependable,
        efficient, and future-ready asset management system that enhances
        decision-making, optimizes resource utilization, and supports long-term
        operational excellence.
      </p>

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default About;
