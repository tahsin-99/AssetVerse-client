import React, { useState } from "react";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import unknown from "../assets/images/unknownUser.png";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 ">
          <Container>
            <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
              {/* Logo */}
              <Link to="/" className="flex items-center-safe">
                <img src={logo} alt="" className="w-30" />
                <p className="text-5xl font-bold">AssetVerse</p>
              </Link>
              <div className="flex flex-row gap-4 font-bold">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                {user && (
                  <>
                    <NavLink to="request-assets">Request Assets</NavLink>

                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </>
                )}
              </div>
              {/* Dropdown Menu */}
              <div className="relative">
                <div className="flex flex-row items-center gap-3">
                  {/* Dropdown btn */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                  >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                      {/* Avatar */}
                      <img
                        className="rounded-full"
                        referrerPolicy="no-referrer"
                        src={user && user.photoURL ? user.photoURL : unknown}
                        alt="profile"
                        height="30"
                        width="30"
                      />
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                      {user ? (
                        <>
                          <Link
                            to="/dashboard"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                          >
                            Dashboard
                          </Link>
                          <div
                            onClick={logOut}
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                          >
                            Logout
                          </div>
                          <Link
                            to="/profile"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                          >
                            Profile
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
