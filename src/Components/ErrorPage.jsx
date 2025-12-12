import React from "react";
import error from "../assets/images/Error.png";
import { useNavigate } from "react-router";

const Errorpage = () => {
  const navigate = useNavigate();
  return (
    <>
      <title>Error-404</title>
      <div className="text-center space-y-5 flex flex-col justify-center items-center min-h-screen">
        <img className="mx-auto" src={error} alt="" />

        <div>
          <p className="text-4xl font-semibold">Oops,page not found!</p>
          <p className="font-normal text-[20px]">
            The page you are looking for is not available.
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-20 text-white bg-linear-to-r from-[#632EE3] to-[#9F62F2] font-semibold rounded-sm w-[150px] h-[48px] cursor-pointer"
        >
          Go Back!
        </button>
      </div>
    </>
  );
};

export default Errorpage;
