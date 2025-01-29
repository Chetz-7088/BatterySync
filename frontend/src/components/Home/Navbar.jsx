import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/BatterySync.png";

const Navbar = () => {
    const [activeItem, setActiveItem] = useState("home");

    const handleNavClick = (item) => {
        setActiveItem(item);
    }

    const scrollTo = () => {
        const section = document.getElementById("hero");
        if(section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="navbar">
            <div className="logo-container flex justify-start items-center mb-1.5">
                <Link className="logo flex items-center text-white" to="/">
                    <img src={logo} alt="Company Logo" className="w-24 h-24 mr-4" />
                    <h1 className="text-4xl font-semibold">BatterySync</h1>
                </Link>
            </div>
            <nav className='navigation'>
                <ul>
                    <li
                        className={`list ${activeItem === "home" ? "active" : ""}`}
                        onClick={() => handleNavClick("home")}
                    >
                        <Link to="/">
                            <span className='icon'><ion-icon name="home" /></span>
                            <span className='text' onClick={scrollTo}>Home</span>
                        </Link>
                    </li>
                    <li
                        className={`list ${activeItem === "plans" ? "active" : ""}`}
                        onClick={() => handleNavClick("plans")}
                    >
                        <Link to="/">
                            <span className='icon'><ion-icon name="pricetag" /></span>
                            <span className='text'>Explore Plans</span>
                        </Link>
                    </li>
                    <li
                        className={`list ${activeItem === "signup" ? "active" : ""}`}
                        onClick={() => handleNavClick("signup")}
                    >
                        <Link to="/signup">
                            <span className='icon'><ion-icon name="arrow-up-circle-sharp" /></span>
                            <span className='text'>Sign Up</span>
                        </Link>
                    </li>
                    <li
                        className={`list ${activeItem === "login" ? "active" : ""}`}
                        onClick={() => handleNavClick("login")}
                    >
                        <Link to="/login">
                            <span className='icon'><ion-icon name="log-in" /></span>
                            <span className='text'>Login</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;