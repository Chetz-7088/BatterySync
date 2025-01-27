import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import PageTransitionWrapper from '../../PageTransitionWrapper';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
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

            {/* Benefits Section */}
            <section className="benefits">
                <h2>Benefits</h2>
                <ul>
                    <li><AiOutlineCheckCircle /> Extended Battery Life</li>
                    <li><AiOutlineCheckCircle /> Optimized Charging</li>
                    <li><AiOutlineCheckCircle /> Predictive Alerts</li>
                    <li><AiOutlineCheckCircle /> Energy Efficiency</li>
                </ul>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <AiOutlineCheckCircle size={40} />
                        <h3>Step 1: Connect Your EV</h3>
                        <p>Simply connect your EV to start monitoring.</p>
                    </div>
                    <div className="step">
                        <AiOutlineCheckCircle size={40} />
                        <h3>Step 2: Monitor Your Battery Health</h3>
                        <p>Keep an eye on your battery’s health metrics.</p>
                    </div>
                    <div className="step">
                        <AiOutlineCheckCircle size={40} />
                        <h3>Step 3: Receive Alerts & Optimize Usage</h3>
                        <p>Get maintenance alerts and optimize energy use.</p>
                    </div>
                </div>
            </section>

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