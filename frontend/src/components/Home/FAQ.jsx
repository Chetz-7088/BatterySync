import React, { useState } from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai';

const benefitsData = [
    { title: "Extended Battery Life", description: "Proper monitoring helps extend your EV battery lifespan by reducing degradation." },
    { title: "Optimized Charging", description: "Smart charging ensures efficient energy usage, reducing unnecessary strain on the battery." },
    { title: "Predictive Alerts", description: "Get early warnings about potential battery failures, preventing costly breakdowns." },
    { title: "Energy Efficiency", description: "Analyze consumption patterns and optimize power usage for cost savings." }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="benefits">
            <h2>Benefits</h2>
            <ul className="faq-list">
                {benefitsData.map((benefit, index) => (
                    <li key={index} className={`faq-item ${openIndex === index ? "open" : ""}`} onClick={() => toggleFAQ(index)}>
                        <div className="faq-title">
                            <AiOutlineCheckCircle className="faq-icon" />
                            {benefit.title}
                        </div>
                        <p className="faq-description">{benefit.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default FAQ;