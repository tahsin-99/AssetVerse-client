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


export const router = createBrowserRouter([
  {
    path: "/",
    Component:HomeLayout,
    children:[
       {
         path:'/',
        Component:Home
    }
    ]
  },
  
  {
    path:'/register',
    Component:Register
  },
  {
    path:'/login',
    Component:Login
  },

  {
    path:'/dashboard',
    Component:Dashboard,
    children:[
      {
        path:'add-assets',
        Component:AddAssets
      },
      {
         
        path:'affiliated-employees',
        Component:AffiliatedEmployees
      
      },
      {
         path:'manage-employees',
        Component:ManageEmployees
      },
      {
         path:'request-assets',
        Component:RequestAssets
      },
      {
         path:'payment',
        Component:Payment
      },
      {
         path:'profile',
        Component:Profile
      }
    ]
  }

]);
