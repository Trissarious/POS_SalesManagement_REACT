import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AccountLoginValid/AuthContext';
import "./CSS Files/./AdminMainPage.css";

const AdminMainPage = () => {
  const { isSalesmanLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Delete the 'cashierToken' from local storage
    localStorage.removeItem('adminToken');
    // Clear the login state
    localStorage.removeItem('adminLoggedIn');
    // Redirect to the login page
    navigate('/loginadmin');
  };

  useEffect(() => {
    // Check for a valid JWT token on page load
    const token = localStorage.getItem('adminToken');

    if (!token) {
      // Redirect to the login page if there's no token
      navigate('/loginadmin');
    } else {
      // Verify the token on the server, handle token expiration, etc.
      // If token is valid, setIsCashierLoggedIn(true)
    }
  }, [isSalesmanLoggedIn, navigate]);

  return (
<div className="center-bod">
<div className="button-container">
  <Link to="/createaccountadmin">
    <button className="button1">Create New Account</button>
  </Link>
  <br></br>
  <Link to="/viewaccounts">
    <button className="button2">View Accounts</button>
  </Link>
  <br></br>
  <button className= "button2" onClick={handleLogout}>Sign Out</button>
</div>
<Outlet />
</div>
  );
};

export default AdminMainPage;




