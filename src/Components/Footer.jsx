import React from "react";
import xImg from "../assets/images/x.png";
import inImg from "../assets/images/in.png";
import fImg from "../assets/images/f.png";
import mImg from "../assets/images/m.png";
import logo from "../assets/images/logo.png";
import { Link } from "react-router";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className=" mt-50 bg-[#2d5da1] text-center lg:w-full  sm:w-full  lg:mx-auto text-black  md:ml-4 ">
      <div
        className=" w-full  grid sm:grid-cols-5 grid-cols-1
        h-auto gap-20 items-center p-4 "
      >
        <div className="text-black">
          <Link to="/" className="text-2xl font-bold mb-4 w-40">
            <img src={logo} alt="" />
          </Link>
          <p className="font-semibold text-white">
            AssetVerse is a modern asset management platform designed to
            simplify the way businesses track, manage, and optimize their
            company assets. With a user-friendly dashboard, it allows companies
            to assign assets to employees, monitor usage in real-time, and
            generate detailed analytics for better decision-making. AssetVerse
            ensures secure data protection, seamless asset transfers, and
            maintenance tracking to reduce operational downtime. Trusted by
            hundreds of companies worldwide, it provides flexible subscription
            plans to fit different business needs and offers 24/7 support to
            keep operations running smoothly. With easy integration into
            existing tools, intuitive navigation, and regular updates,
            AssetVerse helps businesses increase efficiency, streamline
            workflows, and gain full control over their resources, making asset
            management simple, secure, and reliable.{" "}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-black">Company</h3>
          <Link to='/about' className="text-gray-300 ">About Us</Link>
          <p className="text-gray-300">Our Mission</p>
          <p className="text-gray-300"> Contact Saled </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-black">Services</h3>
          <p className="text-gray-300">Products & Services</p>
          <p className="text-gray-300">Customer Stories</p>
          <p className="text-gray-300">Download Apps </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-black">Information</h3>
          <div className="flex  items-center space-x-2 text-gray-300">
            <div>
              <MdEmail className="text-black" />
            </div>
            <div>assetverse@gmail.com</div>
          </div>

          <div className="flex  items-center space-x-2 text-gray-300">
            <div>
              <FaPhoneAlt className="text-black" />
            </div>
            <div>+094343453423</div>
          </div>

          
        </div>
        <div className="space-y-2 text-black">
          <h3 className="font-semibold ">Social Links</h3>
          <div className="text-gray-300 space-y-2">
            <img src={xImg} alt="" />
            <a href="https://x.com/">AssetVerse System</a>
            <img src={inImg} alt="" />
            <a href="https://www.linkedin.com/">AssetVerse System</a>
            <img src={fImg} alt="" />
            <a href="https://www.facebook.com/">AssetVerse System</a>
            <img src={mImg} alt="" />
            <a href="https://mail.google.com/">support@cst.com</a>
          </div>
        </div>
      </div>
      <div>
        <p className=" text-gray-300  text-[16px] text-center mb-8">
          © 2025-26 AssetVerse All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
