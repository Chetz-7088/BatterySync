import React from 'react';
import { useLocation } from 'react-router-dom';
import LeftSection from './LeftSection';
import Login from "./Login";
import Signup from "./Signup";
import "./authentication.css"

const AuthPage = () => {
    const location = useLocation();
    const isSignup = location.pathname === '/signup';

    return (
        <div className="auth-container">
            <div className="auth-left">
                <LeftSection isSignup={isSignup} />
            </div>
            <div className="auth-right">
                {isSignup ? <Signup /> : <Login />}
            </div>
        </div>
    );
};

export default AuthPage;
