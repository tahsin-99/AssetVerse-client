import React from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const ContactCTA = () => {
    const{user}=useAuth()
  return (
    <>
    {
        !user &&(<section className="py-16 bg-blue-600 text-white text-center">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to streamline your asset management?
        </h2>
        <p className="mb-8">
          Start using AssetVerse today and bring organization and efficiency to your company.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </div>
    </section>)
    }
    </>
    
    
  );
};

export default ContactCTA;
