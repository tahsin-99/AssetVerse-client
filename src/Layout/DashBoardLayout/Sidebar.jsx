import useAuth from "../../hooks/useAuth";
import logo from "../../assets/images/logo.png";
import { BsGraphUp } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { Link, NavLink, useNavigate } from "react-router";
import { AiOutlineBars } from "react-icons/ai";

import { GrLogout, GrUserManager, GrUserWorker } from "react-icons/gr";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdFormatListBulletedAdd, MdOutlinePayment } from "react-icons/md";
import { FaListUl, FaMotorcycle, FaTasks, FaUsers } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
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
  if (isRoleLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex-1">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
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
        {/* Page content here */}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-25 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li className="">
              <Link to="/">
                {" "}
                <img src={logo} className="w-30 " alt="" />
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
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
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Dashboard links */}

            {role === "Employee" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" Request Assets"
                    to="/dashboard/request-assets"
                  >
                    <IoGitPullRequestSharp />

                    <span className="is-drawer-close:hidden">
                      {" "}
                      Request Assets
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "HR" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Assets"
                    to="/dashboard/add-assets"
                  >
                    <MdFormatListBulletedAdd />

                    <span className="is-drawer-close:hidden">Add Assets</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assets List"
                    to="/dashboard/assets-list"
                  >
                    <FaListUl />

                    <span className="is-drawer-close:hidden">Assets List</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Employees"
                    to="/dashboard/manage-employees"
                  >
                    <GrUserManager />

                    <span className="is-drawer-close:hidden">
                      Manage Employees
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Affiliated Employees"
                    to="/dashboard/affiliated-employees"
                  >
                    <FaTasks></FaTasks>

                    <span className="is-drawer-close:hidden">
                      Affiliated Employees
                    </span>
                  </NavLink>
                </li>

               
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment"
                    to="/dashboard/payment"
                  >
                    <MdOutlinePayment />

                    <span className="is-drawer-close:hidden">
                      {" "}
                      Payment History
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
                to="/dashboard/profile"
              >
                <CgProfile />

                <span className="is-drawer-close:hidden">
                  <p>Profile</p>
                </span>
              </NavLink>
            </li>

            <li>
              <div
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Logout"
              >
                <TbLogout2 />
                <span onClick={handleLogout} className="is-drawer-close:hidden">
                  Logout
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
