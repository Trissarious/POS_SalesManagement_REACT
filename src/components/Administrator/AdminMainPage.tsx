import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AccountLoginValid/AuthContext';
import "./CSS Files/./AdminMainPage.css";

const AdminMainPage = () => {
  const { isAdminLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    navigate('/loginadmin');
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const storedUsername = localStorage.getItem('adminUsername');
    console.log('Stored username:', storedUsername); // Add this line
    if (!token) {
      navigate('/loginadmin');
    } else {
      setUsername(storedUsername || 'Admin'); // Set the username, default to 'Admin' if it's not available
    }
  }, [isAdminLoggedIn, navigate]);

  return (
    <div className="center-bod">
    <div className="confirm-forgot-password">
      <div className="profile-container">
        <div className="profile-name">Welcome {username || 'Admin'}!</div> {/* Ensure username is not null or undefined */}
      </div>
      <div className="button-container">
        <div>
          <Link to="/createaccountadmin">
            <button className="button1">Create New Account</button>
          </Link>
        </div>
        <div>
          <Link to="/viewaccounts">
            <button className="button2">View Accounts</button>
          </Link>
        </div>
        <div className="sign-out-button">
          <button className="button2" onClick={handleLogout}>Sign Out</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
