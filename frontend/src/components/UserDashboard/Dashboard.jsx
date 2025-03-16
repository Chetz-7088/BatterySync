import React, { useEffect, useState } from 'react'
import PageTransitionWrapper from '../../PageTransitionWrapper'
import Navbar from '../Navbar/Navbar'
import { isLoggedIn } from '../../lib/server_actions/utils';
import { useNavigate } from 'react-router-dom';
import BatteryForm from './BatteryForm';
import './Dashboard.css';
import RulGraph from './RulGraph';
import BatteryCondition from './BatteryCondition';

const Dashboard = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = isLoggedIn();
        console.log("isLoggedIn? ", checkLogin);
        if (!checkLogin) {
            navigate('/login');
        } else {
            setLoggedIn(true);
        }
    }, [navigate]);

    return (
        <PageTransitionWrapper>
            <Navbar />
            <div className='dashboard'>
                <BatteryCondition />
                <RulGraph />
                <BatteryForm />
            </div>
        </PageTransitionWrapper>
    )
}

export default Dashboard;