import React from 'react';
import { Link } from 'react-router-dom';
import PageTransitionWrapper from '../../PageTransitionWrapper';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Working from './Working';
import Plans from './Plans';
import './home.css';

const Home = () => {
  return (
    <PageTransitionWrapper>
        <div className="home">
            {/* Header */}
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Features Section */}
            <Features />

            {/* How It Works Section */}
            <Working />

            {/* Pricing Section */}
            <Plans />
        </div>
    </PageTransitionWrapper>
  );
};

export default Home;