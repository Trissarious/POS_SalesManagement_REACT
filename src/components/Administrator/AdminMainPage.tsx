import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AccountLoginValid/AuthContext';
import "./CSS Files/./AdminMainPage.css";
import { Typography } from '@mui/material';

const AdminMainPage = () => {
  const { isAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to log out?')
    if (confirm) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminUsername');
      navigate('/loginadmin');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const storedUsername = localStorage.getItem('adminUsername');
    const storedBusinessName = localStorage.getItem('adminBusinessName')
    console.log('Stored username:', storedUsername);
    console.log('Business Name: ', storedBusinessName)
    if (!token) {
      navigate('/loginadmin');
    } 
  }, [isAdminLoggedIn, navigate]);

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




