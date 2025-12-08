import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Banner from './Banner';
import AboutSection from './AboutSection';
import PackageSection from './PackageSection';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <AboutSection></AboutSection>
          <PackageSection></PackageSection>
        </div>
    );
};

export default Home;