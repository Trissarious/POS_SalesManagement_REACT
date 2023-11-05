import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../AccountLoginValid/AuthContext';

const ViewAcconts = () => {
  const { isSalesmanLoggedIn } = useAuth();
  const navigate = useNavigate();

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
      </div>
  );
};

export default ViewAcconts;
