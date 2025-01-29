import React from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Benefits = () => {
    return (
        <section className="benefits">
            <h2>Benefits</h2>
            <ul>
                <li><AiOutlineCheckCircle /> Extended Battery Life</li>
                <li><AiOutlineCheckCircle /> Optimized Charging</li>
                <li><AiOutlineCheckCircle /> Predictive Alerts</li>
                <li><AiOutlineCheckCircle /> Energy Efficiency</li>
            </ul>
        </section>
    );
};

export default Benefits;