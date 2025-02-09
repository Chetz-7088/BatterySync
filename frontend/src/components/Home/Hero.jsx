import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    const scrollTo = () => {
        const section = document.getElementById("how-it-works");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="hero" className="hero">
            <div className="hero-content">
                <h1 className="hero-heading">
                    Take Control of Your <span className="highlight">EV's Battery Health</span>
                </h1>
                <p className="hero-subheading">
                    Empower Your EV Journey with Smart Battery Insights and Real-Time Monitoring. Optimize battery performance, plan your trips effortlessly, and drive with confidence—all in one powerful platform.
                </p>
                <div className="hero-buttons">
                    <Link to="/signup">
                        <button className="btn-primary">
                            Get Started
                        </button>
                    </Link>
                    <button className="btn-secondary" onClick={scrollTo}>
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;