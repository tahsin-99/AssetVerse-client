import React from 'react';
import Navbar from '../../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer';

const HomeLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
           <Navbar></Navbar>
           
            <main className='flex-1 pt-[100px] '>
                <Outlet></Outlet>
            </main>
           <Footer></Footer>
          
        </div>
    );
};

export default HomeLayout;