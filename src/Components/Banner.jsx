import React from 'react';
import assetImg from '../assets/images/assetmanage.jpg'
import workImg from '../assets/images/worktogether.avif'
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';
import { FaChartLine, FaCheckCircle, FaShieldAlt, FaUsersCog } from 'react-icons/fa';

const Banner = () => {
    const {user}=useAuth()
    return (
       <>
        <div className="bg-gradient-to-r from-[#0A1D37] to-[#1B3B5F] text-white py-20 px-6 mt-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Your Company Assets Efficiently & Smartly
          </h1>

          <p className="text-lg text-gray-200 mt-4">
            Track company computers, laptops, phones, furniture and resources in one central system.
            Assign, monitor and control assets with real-time insights.
          </p>

          <div className="mt-8 flex gap-4">
           {
            !user &&
            <>
             <Link to='/register' className="bg-white text-[#0A1D37] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              Get Started
            </Link>
            </>
           }

            <Link to='/about' className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#0A1D37] transition">
              Learn More
            </Link>
          </div>
        </div>

       
        <div className="flex justify-center ">
          <img className='rounded-xl'
            src={assetImg}
          />
        </div>
      </div>
    </div>
      <section className="py-16 px-6 bg-gray-50">
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
       </>
    
    );
};

export default Banner;