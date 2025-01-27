import React from "react";
import { FaBatteryHalf, FaMapMarkedAlt, FaTools } from "react-icons/fa";

const Features = () => {
    return (
        <section className="features">
            <h2 className="features-heading">Core Features</h2>
            <div className="feature-cards">
                <div className="feature-card">
                    <div className="icon-circle">
                        <FaBatteryHalf size={40} />
                    </div>
                    <h3>Battery Performance Tracking</h3>
                    <p>
                        Keep track of your battery’s health with real-time metrics and detailed analysis, ensuring it delivers peak performance at all times.
                    </p>
                </div>
                <div className="feature-card">
                    <div className="icon-circle">
                        <FaTools size={40} />
                    </div>
                    <h3>Predictive Maintenance</h3>
                    <p>
                        Stay ahead of potential issues with proactive maintenance alerts, reducing unexpected breakdowns and repair costs.
                    </p>
                </div>
                <div className="feature-card">
                    <div className="icon-circle">
                        <FaMapMarkedAlt size={40} />
                    </div>
                    <h3>Trip Planner & Charging Station Locator</h3>
                    <p>
                        Plan your trips with ease by locating nearby charging stations and optimizing your route for seamless travel.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Features;