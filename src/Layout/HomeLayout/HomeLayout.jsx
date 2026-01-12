import React from 'react';
import Navbar from '../../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer';
import ScrollToTop from '../../Components/ScrollToTop';

const HomeLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
           <Navbar></Navbar>
           <ScrollToTop></ScrollToTop>
            <main className='flex-1 pt-[100px] '>
                <Outlet></Outlet>
            </main>
           <Footer></Footer>
          
        </div>
    );
};

export default HomeLayout;