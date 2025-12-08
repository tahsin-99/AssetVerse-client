import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaUsersCog, FaChartLine, FaClipboardList, FaHeadset, FaExchangeAlt, FaShieldAlt } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const iconMap = {
  FaClipboardList: <FaClipboardList size={40} className="text-blue-600" />,
  FaUsersCog: <FaUsersCog size={40} className="text-blue-600" />,
  FaChartLine: <FaChartLine size={40} className="text-blue-600" />,
  FaExchangeAlt: <FaExchangeAlt size={40} className="text-blue-600" />,
  FaShieldAlt: <FaShieldAlt size={40} className="text-blue-600" />,
  FaHeadset: <FaHeadset size={40} className="text-blue-600" />
};
const FeaturesSection = () => {
  const axiosSecure=useAxiosSecure()
  const {data:features=[]}=useQuery({
    queryKey:['features'],
    queryFn: async()=>{
      const result=await axiosSecure.get('/features')
      return result.data 
    }

  })
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-5">

        <h2 className="text-5xl md:text-5xl font-bold text-center mb-12 mt-50">
          Powerful Features of <span className="text-blue-600 ">AssetVerse</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {
          features.map((item) => (
            <div
              key={item._id}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-4">{iconMap[item.icon]}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
