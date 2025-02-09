import React, { useEffect, useState } from 'react'
import PageTransitionWrapper from '../../PageTransitionWrapper'
import Navbar from '../Navbar/Navbar'
import { isLoggedIn } from '../../lib/server_actions/utils';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isUserLoggedIn = isLoggedIn();
    setLoggedIn(isUserLoggedIn);

    if (!loggedIn) {
      // navigate('/login');
    }
  }, []);

  return (
    <PageTransitionWrapper>
      <div className="">
        {/* Header */}
        <Navbar />

      </div>
    </PageTransitionWrapper>
  )
}

export default Dashboard
