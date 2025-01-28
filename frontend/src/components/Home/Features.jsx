import React from "react";
import { FaBatteryHalf, FaMapMarkedAlt, FaTools } from 'react-icons/fa';

const Features = () => {
    return (
        <section className="features">
            <h2>CORE FEATURES</h2>
            <div className="feature-cards">
                <div className="feature-card">
                    <div className="card-front">
                        <div className="icon-container">
                            <FaBatteryHalf size={50} />
                        </div>
                    </div>
                    <div className="card-back">
                        <h3>Battery Performance Tracking</h3>
                        <p>Keep your EV battery in peak condition by monitoring its health in real-time. Gain actionable insights to ensure maximum performance and longevity.</p>
                    </div>
                </div>
                <div className="feature-card">
                    <div className="card-front">
                        <div className="icon-container">
                            <FaTools size={50} />
                        </div>
                    </div>
                    <div className="card-back">
                        <h3>Predictive Maintenance</h3>
                        <p>Stay ahead of potential issues with early alerts for maintenance. Avoid costly repairs and extend the life of your EV battery seamlessly.</p>
                    </div>
                </div>
                <div className="feature-card">
                    <div className="card-front">
                        <div className="icon-container">
                            <FaMapMarkedAlt size={50} />
                        </div>
                    </div>
                    <div className="card-back">
                        <h3>Trip Planner & Charging Station Locator</h3>
                        <p>Effortlessly find charging stations on your route. Plan trips more effectively, ensuring you always stay charged and ready for your journey.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;