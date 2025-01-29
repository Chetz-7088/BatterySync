import React from 'react';
import { Link } from 'react-router-dom';
import PageTransitionWrapper from '../../PageTransitionWrapper';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Benefits from './Benefits';
import Working from './Working';
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

            {/* Benefits Section */}
            <Benefits />

            {/* Pricing Section */}
            <section className="pricing">
                <h2>Pricing Plans</h2>
                <div className="pricing-tiers">
                    <div className="pricing-tier">
                        <h3>Free</h3>
                        <ul>
                            <li>Basic Battery Health Monitoring</li>
                            <li>Limited Maintenance Alerts</li>
                        </ul>
                        <button>Sign Up</button>
                    </div>
                    <div className="pricing-tier">
                        <h3>Premium</h3>
                        <ul>
                            <li>Advanced Monitoring & Alerts</li>
                            <li>Charging Station Locator</li>
                        </ul>
                        <button>Sign Up</button>
                    </div>
                    <div className="pricing-tier">
                        <h3>Enterprise</h3>
                        <ul>
                            <li>Full Platform Access</li>
                            <li>Priority Support</li>
                        </ul>
                        <button>Sign Up</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="footer-links">
                    <Link to="/about">About</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                </div>
                <div className="social-media">
                    <a href="https://facebook.com">Facebook</a>
                    <a href="https://twitter.com">Twitter</a>
                    <a href="https://linkedin.com">LinkedIn</a>
                </div>
                <div className="contact">
                    <p>Contact us at: support@evplatform.com</p>
                </div>
            </footer>
        </div>
    </PageTransitionWrapper>
  );
};

export default Home;