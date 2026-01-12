import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import unknown from "../assets/images/unknownUser.png";
import logo from "../assets/images/logo.png";
import useRole from "../hooks/useRole";
import Loading from "./Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const { data: users } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/profile");
      return res.data;
    },
  });

  if (isRoleLoading) return <Loading />;

  return (
    <div className="fixed w-full z-10 shadow-sm bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-20 sm:w-30" />
              <p className="text-2xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                AssetVerse
              </p>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex gap-4 font-bold text-gray-800 dark:text-gray-200">
              <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/privacy">PrivacyPolicy</NavLink>
              {!user && (
                <>
                  <NavLink to="/employee-register">Join As Employee</NavLink>
                  <NavLink to="/hr-register">Join As HR Manager</NavLink>
                </>
              )}
              {role === "HR" && <NavLink to="/employee-register">Join As Employee</NavLink>}
              {role === "Employee" && <NavLink to="/hr-register">Join As HR Manager</NavLink>}
            </div>

            {/* Right Side */}
            <div className="relative flex items-center gap-3">
              {/* Theme Toggle */}
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={theme === "dark"}
                className="toggle toggle-primary"
              />

              {/* Menu Button */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 border border-gray-300 dark:border-gray-700
                           flex items-center gap-3 rounded-full cursor-pointer
                           hover:shadow-md transition bg-white dark:bg-gray-800"
              >
                <AiOutlineMenu className="text-gray-800 dark:text-gray-200" />
                <div className="hidden md:block">
                  <img
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                    src={users?.image || unknown}
                    alt="profile"
                    height="30"
                    width="30"
                  />
                </div>
              </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
              <div
                className="absolute rounded-xl shadow-md w-[40vw] md:w-[12vw]
                           right-0 top-12 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                           overflow-hidden transition-colors duration-300"
              >
                <div className="flex flex-col cursor-pointer">
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Dashboard
                      </Link>
                      <div
                        onClick={logOut}
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                      >
                        Logout
                      </div>
                      <Link
                        to="/dashboard/profile"
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Profile
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
