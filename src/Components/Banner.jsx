import React from "react";
import assetImg from "../assets/images/assetmanage.jpg";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
  const { user,loading } = useAuth();
if(loading){
  return null
}
  return (
    <>
    
    <div className="bg-gradient-to-r from-[#0A1D37] to-[#1B3B5F] text-white py-20 px-6 mt-80">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Your Company Assets Efficiently & Smartly
          </h1>

          <p className="text-lg text-gray-200 mt-4">
            Track company computers, laptops, phones, furniture and resources in
            one central system. Assign, monitor and control assets with real-time
            insights.
          </p>

          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {!user && (
              <Link
                to="/login"
                className="bg-white text-[#0A1D37] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Get Started
              </Link>
            )}

            <Link
              to="/about"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#0A1D37] transition"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src={assetImg}
            alt="Asset Management"
            className="rounded-xl shadow-lg"
          />
        </motion.div>

      </div>
    </div>
    </>
  );
};

export default Banner;
