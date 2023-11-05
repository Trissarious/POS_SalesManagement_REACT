import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className="confirm-forgot-password">
      <div className="profile-container">
        <div className="profile-picture">
          <img src="/path-to-your-image" alt="Profile" />
        </div>
        <div className="profile-name">Admin</div>
      </div>
      <div className="button-container">
        <div>
          <Link to="/createaccountadmin">
            <button>Create New Account</button>
          </Link>
        </div>
        <div>
          <Link to="/viewaccounts">
            <button>View Accounts</button>
          </Link>
        </div>
        <div className="sign-out-button">
            <button onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
