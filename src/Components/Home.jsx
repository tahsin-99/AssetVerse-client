import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Banner from './Banner';
import AboutSection from './AboutSection';
import PackageSection from './PackageSection';
import FeaturesSection from './FeaturesSection';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <AboutSection></AboutSection>
          <PackageSection></PackageSection>
          <FeaturesSection></FeaturesSection>
        </div>
    );
};

export default Home;