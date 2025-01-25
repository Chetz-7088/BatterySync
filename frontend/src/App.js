import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from "./components/Authentication/AuthPage";
import ForgetPassword from "./components/Authentication/ForgetPass";
import VerifyOtp from "./components/Authentication/Verify_Otp";
import UpdatePass from "./components/Authentication/UpdatePass";
import Home from "./components/Authentication/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication Page */}
        <Route path="/login" element={<AuthPage isSignup={false} />} />
        <Route path="/signup" element={<AuthPage isSignup={true} />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/updatePassword" element={<UpdatePass />} />

        {/* Error Handler */}
        <Route path="*" element={<h1>Error 404: Page Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
