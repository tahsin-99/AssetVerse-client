import React from "react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/images/logo.png";
import { BsBoxSeam } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router";
import { RiTeamFill } from "react-icons/ri";
import { GrAnalytics, GrUserManager } from "react-icons/gr";
import { MdFormatListBulletedAdd, MdOutlinePayment } from "react-icons/md";
import { FaListUl, FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { IoGitPullRequestSharp } from "react-icons/io5";
import useRole from "../../hooks/useRole";
import Loading from "../../Components/Loading";

const Sidebar = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/login"))
      .catch((err) => console.log(err));
  };

  if (isRoleLoading) return <Loading />;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex-1">
        <nav className="navbar w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
        </nav>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-64">
          <ul className="menu w-full grow">
            <li>
              <Link to="/">
                <img src={logo} className="w-32 mx-auto my-4" alt="Logo" />
              </Link>
            </li>

            {/* Employee Links */}
            {role === "Employee" && (
              <>
                <li>
                  <NavLink
                    className="tooltip tooltip-right dark:text-blue-500"
                    data-tip="Request Assets"
                    to="/dashboard/request-assets"
                  >
                    <IoGitPullRequestSharp />
                    <span>Request Assets</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="tooltip tooltip-right dark:text-blue-500"
                    data-tip="My Assets"
                    to="/dashboard/my-assets"
                  >
                    <BsBoxSeam />
                    <span>My Assets</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="tooltip tooltip-right dark:text-blue-500"
                    data-tip="My Team"
                    to="/dashboard/my-team"
                  >
                    <RiTeamFill />
                    <span>My Team</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* HR Links */}
            {role === "HR" && (
              <>
                <li>
                  <NavLink
                    className="tooltip tooltip-right dark:text-blue-500"
                    data-tip="My Assets List"
                    to="/dashboard/assets-list"
                  >
                    <FaListUl />
                    <span>My Assets List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="tooltip tooltip-right dark:text-blue-500"
                    data-tip="Analytics"
                    to="/dashboard/analytics"
                  >
                    <GrAnalytics />
                    <span>Analytics</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="tooltip tooltip-right dark:text-blue-500"
                    data-tip="Add Assets"
                    to="/dashboard/add-assets"
                  >
                    <MdFormatListBulletedAdd />
                    <span>Add Assets</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="tooltip tooltip-right dark:text-blue-500"
                    data-tip="All Requests"
                    to="/dashboard/manage-employees"
                  >
                    <GrUserManager />
                    <span>All Requests</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="tooltip tooltip-right dark:text-blue-500"
                    data-tip="My Employee List"
                    to="/dashboard/affiliated-employees"
                  >
                    <FaTasks />
                    <span>My Employee List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="tooltip tooltip-right dark:text-blue-500"
                    data-tip="Upgrade Package"
                    to="/dashboard/payment"
                  >
                    <MdOutlinePayment />
                    <span>Upgrade Package</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Common Links */}
            <li>
              <NavLink
                className="tooltip tooltip-right dark:text-blue-500"
                data-tip="Profile"
                to="/dashboard/profile"
              >
                <CgProfile />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <div
                onClick={handleLogout}
                className="tooltip tooltip-right cursor-pointer dark:text-blue-500"
                data-tip="Logout"
              >
                <TbLogout2 />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
