import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AccountLoginValid/AuthContext';
import "./CSS Files/./AdminMainPage.css";
import { Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

interface Account {
  userid: number,
  fname: string,
  business_name: string,
}

const AdminMainPage = () => {
  const { isAdminLoggedIn, setIsAdminLoggedIn, adminUser } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to log out?')
    if (confirm) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminUsername');
      navigate('/loginadmin');
    }
  };

  // Token
  useEffect(() => {
    const token = localStorage.getItem('adminLoggedIn');
    const storedFirstName = localStorage.getItem('adminFirstName');
    const storedBusinessName = localStorage.getItem('adminBusinessName');

    if (!token) {
      navigate('/loginadmin');
    } else {
      setIsAdminLoggedIn(true);
    axios.get('http://localhost:8080/user/getAllUser')
      .then((response) => {
        console.log('Hello, ', storedFirstName);
        console.log('Business Name:', storedBusinessName);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [isAdminLoggedIn, navigate, adminUser]);


return (
  <div className="center-bod">
    <div className="profile-container">
        <div className="profile-name" 
          style= 
            {{
               backgroundColor: '#1D7D81', 
               color: 'white', padding: 20, 
               fontWeight: 'bold', width: '50%', 
               justifyContent: 'center' 
            }}>
          {localStorage.getItem('adminFirstName')}
        </div>
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
  </div>
  );
};

export default AdminMainPage;




