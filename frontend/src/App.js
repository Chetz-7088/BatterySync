import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from "./components/Authentication/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        {/* Authentication Page */}
        <Route path="/login" element={<AuthPage isSignup={false} />} />
        <Route path="/signup" element={<AuthPage isSignup={true} />} />
        {/* Error Handler */}
        <Route path="*" element={<h1>Error 404: Page Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
