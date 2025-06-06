import React from "react";
import "./authentication.css";
import logo from "../../assets/BatterySync.png";
import { Link } from "react-router-dom";
import {
    FaBatteryHalf,
    FaRegCheckCircle,
    FaMapMarkedAlt,
} from "react-icons/fa";

const LeftSection = ({ isSignup }) => {
    return (
        <div className="left-section flex flex-col justify-center items-center">
            <div className="logo-container flex justify-start items-center mb-1.5">
                <Link className="logo flex items-center text-white" to="/">
                    <img src={logo} alt="Company Logo" className="w-56 h-56 mr-4" />
                    <p style={{ fontSize: "32px" }}>
                        <strong>Battery</strong><span className="lugrasimo-regular">Sync</span>
                    </p>
                </Link>
            </div>

            <h2 className="tagline text-white text-3xl font-bold mb-0.5">
                Take Control of Your EV Battery Health & Performance
            </h2>

            <div className="text-lg mb-1.5">
                <p style={{ color: "#9aff9d" }}>
                    {isSignup ? "Get started now" : "Join back to your previous journey"}
                </p>
            </div>
            <div className="ev-features text-white mb-1.5">
                <ul className="features list-none mt-1 space-y-0.75">
                    <li className="flex flex-col items-center">
                        <FaBatteryHalf className="react-icon" color="#9aff9d" />
                        <div className="feature-title">Battery Performance Tracking</div>
                        <div className="feature-description">
                            Track and monitor the health of your EV battery in real-time.
                        </div>
                    </li>
                    <li className="flex flex-col items-center">
                        <FaRegCheckCircle className="react-icon" color="#9aff9d" />
                        <div className="feature-title">Health Diagnostics & Alerts</div>
                        <div className="feature-description">
                            Receive instant alerts and diagnostic reports on battery health.
                        </div>
                    </li>
                    <li className="flex flex-col items-center">
                        <FaMapMarkedAlt className="react-icon" color="#9aff9d" />
                        <div className="feature-title">
                            Trip Planner & Charging Station Finder
                        </div>
                        <div className="feature-description">
                            Find nearby charging stations and plan your trips accordingly.
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LeftSection;
