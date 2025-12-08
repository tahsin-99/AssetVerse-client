import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PackageSection = () => {
const axiosSecure=useAxiosSecure()
  const {data:packages=[]}=useQuery({
    queryKey:['packages'],
    queryFn:async()=>{
     const result= await axiosSecure.get('/packages')
     return result.data
    }
  })
  console.log(packages);
  return (
    <div>
      <h1 className="text-6xl font-bold text-center mt-30">Packages Section</h1>

      <div className="grid grid-cols-3 mt-30">

        {packages.map((pack)=>(<div key={pack._id} className="card w-96  shadow-sm h-full pb-20 text-white bg-[#214d80] mx-auto">
        <div className="card-body">
          {
            pack.name==='Standard'&&
            <span className="badge badge-xs badge-warning">Most Popular</span>

            
          }
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">{pack.name}</h2>
            <span className="text-xl ">${pack.price}/mo</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{pack.features[0]}</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{pack.features[1]}</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{pack.features[2]}</span>
            </li>
            
             
          </ul>
          
        </div>
      </div>))}
        

      </div>

      
    </div>
  );
};

export default PackageSection;
