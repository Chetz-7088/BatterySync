import React from 'react';
import { Link } from 'react-router-dom';
import { FaCarBattery, FaMapMarkedAlt, FaTools, FaStar } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import logo from '../../assets/BatterySync.png'
import './home.css'

const Home = () => {
  return (
    <div className="home">
        {/* Header */}
        <header className="navbar">
            <div className="logo-container flex justify-start items-center mb-1.5">
                <Link className="logo flex items-center text-white" to="/">
                    <img src={logo} alt="Company Logo" className="w-24 h-24 mr-4" />
                    <h1 className="text-4xl font-semibold">BatterySync</h1>
                </Link>
            </div>
            <nav className='navigation'>
                <ul>
                    <li className='list active'>
                        <Link to="/">
                            <span className='icon'><ion-icon name="home" /></span>
                            <span className='text'>Home</span>
                        </Link>
                    </li>
                    <li className='list'>
                        <Link to="/plans">
                            <span className='icon'><ion-icon name="pricetag" /></span>
                            <span className='text'>Explore Plans</span>
                        </Link>
                    </li>
                    <li className='list'>
                        <Link to="/signup">
                            <span className='icon'><ion-icon name="arrow-up-circle-sharp" /></span>
                            <span className='text'>Sign Up</span>
                        </Link>
                    </li>
                    <li className='list'>
                        <Link to="/login">
                            <span className='icon'><ion-icon name="log-in" /></span>
                            <span className='text'>Login</span>
                        </Link>
                    </li>
                    <div className="indicator"></div>
                </ul>
            </nav>
        </header>

        {/* Hero Section */}
        <section className="hero">
            <h1>Take Control of Your EV Battery Health & Performance</h1>
            <p>Monitor battery health, optimize energy usage, and extend your EV’s lifespan.</p>
            <div className="hero-buttons">
            <button>Get Started</button>
            <button>Learn More</button>
            </div>
        </section>

        {/* Features Section */}
        <section className="features">
            <h2>Core Features</h2>
            <div className="feature-cards">
                <div className="feature-card">
                    <FaCarBattery size={50} />
                    <h3>Battery Health Monitoring</h3>
                    <p>Monitor your battery’s health in real time to ensure optimal performance.</p>
                </div>
                <div className="feature-card">
                    <FaTools size={50} />
                    <h3>Predictive Maintenance</h3>
                    <p>Receive alerts for potential issues and prevent unexpected breakdowns.</p>
                </div>
                <div className="feature-card">
                    <FaMapMarkedAlt size={50} />
                    <h3>Charging Station Locator</h3>
                    <p>Find the best charging stations on your route with ease.</p>
                </div>
            </div>
        </section>

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
        <section className="how-it-works">
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

        {/* Testimonials Section */}
        <section className="testimonials">
            <h2>What Our Users Say</h2>
            <div className="testimonials-list">
                <div className="testimonial">
                    <p>"This platform has helped me extend my EV's battery life!"</p>
                    <div className="user-info">
                        <img src="user1.jpg" alt="User 1" />
                        <span>John Doe</span>
                    </div>
                    <div className="rating">
                        <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} />
                    </div>
                </div>
                <div className="testimonial">
                    <p>"The charging station locator is a game-changer for road trips."</p>
                    <div className="user-info">
                        <img src="user2.jpg" alt="User 2" />
                        <span>Jane Smith</span>
                    </div>
                    <div className="rating">
                        <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} />
                    </div>
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
  );
};

export default Home;