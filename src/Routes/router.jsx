import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../Components/Home";
import Login from "../Auth/login";

import Dashboard from "../Layout/DashBoardLayout/Dashboard";
import AddAssets from "../Layout/DashBoardLayout/MenuPages/AddAssets";
import AffiliatedEmployees from "../Layout/DashBoardLayout/MenuPages/AffiliatedEmployees";
import ManageEmployees from "../Layout/DashBoardLayout/MenuPages/ManageEmployees";
import RequestAssets from "../Layout/DashBoardLayout/MenuPages/RequestAssets";
import Payment from "../Layout/DashBoardLayout/MenuPages/Payment";
import Profile from "../Layout/DashBoardLayout/MenuPages/Profile";
import About from "../Pages/About";
import EmployeeRegister from "../Auth/EmployeeRegister";
import HrRegister from "../Auth/HrRegister";
import AssetsList from "../Layout/DashBoardLayout/MenuPages/AssetsList";
import Loading from "../Components/Loading";
import Errorpage from "../Components/ErrorPage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    hydrateFallbackElement:<Loading></Loading>,
    errorElement:<Errorpage></Errorpage>,
    children: [
      {
        index: true,
        Component: Home,
      },

     

      {
        path: "/about",
        Component: About,
      },
    ],
  },

  {
    path: "/employee-register",
    Component: EmployeeRegister,
  },
  {
    path: "/hr-register",
    Component:HrRegister,
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
        path: "assets-list",
        Component: AssetsList,
      },
       {
        path: "request-assets",
        Component: RequestAssets,
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
