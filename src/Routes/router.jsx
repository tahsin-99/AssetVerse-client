import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../Components/Home";
import Login from "../Auth/login";
import Register from "../Auth/register";
import Dashboard from "../Layout/DashBoardLayout/Dashboard";
import AddAssets from "../Layout/DashBoardLayout/MenuPages/AddAssets";
import AffiliatedEmployees from "../Layout/DashBoardLayout/MenuPages/AffiliatedEmployees";
import ManageEmployees from "../Layout/DashBoardLayout/MenuPages/ManageEmployees";
import RequestAssets from "../Layout/DashBoardLayout/MenuPages/RequestAssets";
import Payment from "../Layout/DashBoardLayout/MenuPages/Payment";
import Profile from "../Layout/DashBoardLayout/MenuPages/Profile";
import About from "../Pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/request-assets",
        Component: RequestAssets,
      },

      {
        path: "/about",
        Component: About,
      },
    ],
  },

  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        path: "add-assets",
        Component: AddAssets,
      },
      {
        path: "affiliated-employees",
        Component: AffiliatedEmployees,
      },
      {
        path: "manage-employees",
        Component: ManageEmployees,
      },

      {
        path: "payment",
        Component: Payment,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);
