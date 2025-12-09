import React from 'react';
import assetImg from '../assets/images/assetmanage.jpg'

import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';


const Banner = () => {
    const {user}=useAuth()
    return (
       <>
       
        <div className="bg-gradient-to-r from-[#0A1D37] to-[#1B3B5F] text-white py-20 px-6 mt-80">
    
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
             <Link to='/login' className="bg-white text-[#0A1D37] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
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
     
       </>
    
    );
};

export default Banner;