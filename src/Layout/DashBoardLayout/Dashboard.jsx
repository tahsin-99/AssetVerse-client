import React from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router';

const Dashboard = () => {
    return (
         <div className='drawer lg:drawer-open min-h-screen'>
      
      <Sidebar/>
      
      
        <div className='drawer-content flex flex-col w-full p-5 bg-white'>
        
          <Outlet />
        </div>
    
    </div>
    );
};

export default Dashboard;