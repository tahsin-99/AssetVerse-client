import React from 'react';
import workImg from '../assets/images/worktogether.avif'
import { FaChartLine, FaCheckCircle, FaShieldAlt, FaUsersCog } from 'react-icons/fa';

const AboutSection = () => {
    return (
         <section className="py-16 px-6 bg-gray-50 mt-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

       
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1D37]">
            Why Choose AssetVerse?
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed">
            AssetVerse is a modern corporate asset management platform designed to
            help companies track, control, and optimize their resources.  
            From laptops to office equipment, manage everything in one secure system.
          </p>

         
          <div className="mt-8 space-y-6">

            <div className="flex gap-4 items-start">
              <FaCheckCircle className="text-[#1B3B5F] text-3xl" />
              <div>
                <h3 className="text-xl font-semibold text-[#0A1D37]">Real-Time Asset Tracking</h3>
                <p className="text-gray-600 text-sm">
                  Monitor asset location, status, and assignment instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <FaShieldAlt className="text-[#1B3B5F] text-3xl" />
              <div>
                <h3 className="text-xl font-semibold text-[#0A1D37]">Secure & Centralized System</h3>
                <p className="text-gray-600 text-sm">
                  Keep company resources protected with role-based access control.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <FaChartLine className="text-[#1B3B5F] text-3xl" />
              <div>
                <h3 className="text-xl font-semibold text-[#0A1D37]">Insightful Performance Analytics</h3>
                <p className="text-gray-600 text-sm">
                  Generate usage reports to make smarter business decisions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <FaUsersCog className="text-[#1B3B5F] text-3xl" />
              <div>
                <h3 className="text-xl font-semibold text-[#0A1D37]">Easy Employee Asset Assignments</h3>
                <p className="text-gray-600 text-sm">
                  Assign, return, and verify assets with a single click.
                </p>
              </div>
            </div>

          </div>
        </div>

        
        <div className="flex justify-center">
          <img 
            src={workImg}
            className="w-full max-w-md drop-shadow-xl"
          />
        </div>

      </div>
    </section>
    );
};

export default AboutSection;