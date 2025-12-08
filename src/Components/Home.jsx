import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Banner from './Banner';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
        </div>
    );
};

export default Home;