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
import PaymentSuccess from "../Pages/PaymentSuccess";
import PrivateRoute from "./PrivateRoute";
import MyAssets from "../Layout/DashBoardLayout/MenuPages/MyAssets";
import MyTeamPage from "../Layout/DashBoardLayout/MenuPages/MyTeamPage";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import DashBoardHome from "../Layout/DashBoardLayout/DashBoardHome";
import Analytics from "../Layout/DashBoardLayout/MenuPages/Analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
   hydrateFallbackElement:<Loading></Loading>,
    errorElement: <Errorpage></Errorpage>,
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
    Component: HrRegister,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/payment-success",
    Component: PaymentSuccess,
  },

  {
    path: "/dashboard",
   element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
   
    hydrateFallbackElement:<Loading></Loading>,
    errorElement: <Errorpage></Errorpage>,
    children: [
    
      {
       index:true,
        element:<PrivateRoute><DashBoardHome></DashBoardHome></PrivateRoute>
      },
       {
      path: "assets-list",
      element: (
        <PrivateRoute>
          <HrRoute>
            <AssetsList />
          </HrRoute>
        </PrivateRoute>
      )
    },

        {
        path: "add-assets",
         element:<PrivateRoute><HrRoute><AddAssets></AddAssets></HrRoute></PrivateRoute>
      },
      {
        path: "request-assets",
       element:<PrivateRoute><EmployeeRoute><RequestAssets></RequestAssets></EmployeeRoute></PrivateRoute>
      },
      {
        path: "affiliated-employees",
        element:<PrivateRoute><HrRoute><AffiliatedEmployees></AffiliatedEmployees></HrRoute></PrivateRoute>
      },
      {
        path: "manage-employees",
         element:<PrivateRoute><HrRoute><ManageEmployees></ManageEmployees></HrRoute></PrivateRoute>
      },
      {
        path:'analytics',
        element:<PrivateRoute><HrRoute><Analytics></Analytics></HrRoute></PrivateRoute>
      },
      {
        path:'my-assets',
        element:<PrivateRoute><EmployeeRoute><MyAssets></MyAssets></EmployeeRoute></PrivateRoute>

      },
      {
        path:'my-team',
        element:<PrivateRoute><EmployeeRoute><MyTeamPage></MyTeamPage></EmployeeRoute></PrivateRoute>

      },
      {
        path: "payment",
        element:<PrivateRoute><HrRoute><Payment></Payment></HrRoute></PrivateRoute>
      },

      {
        path: "profile",
       element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },
    ],
  },
]);
