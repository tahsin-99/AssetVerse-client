import React from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router';

const Dashboard = () => {
    return (
         <div className='drawer lg:drawer-open min-h-screen'>
      {/* Left Side: Sidebar Component */}
      <Sidebar/>
      {/* Right Side: Dashboard Dynamic Content */}
      
        <div className='drawer-content flex flex-col w-full p-5 bg-white'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
    
    </div>
    );
};

export default Dashboard;