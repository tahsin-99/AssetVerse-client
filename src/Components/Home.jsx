import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Banner from './Banner';
import AboutSection from './AboutSection';
import PackageSection from './PackageSection';
import FeaturesSection from './FeaturesSection';
import Testimonials from './Testimonials';
import Extras from './Extras';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <AboutSection></AboutSection>
          <PackageSection></PackageSection>
          <FeaturesSection></FeaturesSection>
          <Testimonials></Testimonials>
          <Extras></Extras>
        </div>
    );
};

export default Home;