import React from 'react';
import { useLocation } from 'react-router-dom';
import LeftSection from './LeftSection';
import Login from "./Login";
import Signup from "./Signup";
import "./authentication.css"
import PageTransitionWrapper from '../../PageTransitionWrapper';

const AuthPage = () => {
    const location = useLocation();
    const isSignup = location.pathname === '/signup';

    return (
        <PageTransitionWrapper>
            <div className="auth-container">
                <div className="auth-left">
                    <LeftSection isSignup={isSignup} />
                </div>
                <div className="auth-right">
                    {isSignup ? <Signup /> : <Login />}
                </div>
            </div>
        </PageTransitionWrapper>
    );
};

export default AuthPage;
