import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../Components/Home";
import Login from "../Auth/login";
import Register from "../Auth/register";
import Dashboard from "../Layout/DashBoardLayout/Dashboard";


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
    
  }

]);
