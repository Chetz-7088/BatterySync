import React, { useEffect, useState, useRef } from "react";
import { FaBatteryHalf, FaMapMarkedAlt, FaTools } from 'react-icons/fa';

const Features = () => {
    const [isVisible, setIsVisible ] = useState(false);
    const featuresRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );
        if(featuresRef.current){
            observer.observe(featuresRef.current);
        }
        return () => {
            if(featuresRef.current){
                observer.unobserve(featuresRef.current);
            }
        };
    }, []);

    return (
        <section className={`features ${isVisible ? "visible" : ""}`} ref={featuresRef}>
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