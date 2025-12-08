import React from 'react';
import Navbar from '../../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer';

const HomeLayout = () => {
    return (
        <div className=''>
           <Navbar></Navbar>
           <div className='pt-[100px]'>
            <Outlet></Outlet>
           <Footer></Footer>
           </div>
        </div>
    );
};

export default HomeLayout;