import React, { useState } from 'react';
import './CSS FIles/LoginCashier.css';  
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';

const LoginCashier = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('API URL:', '/user/login');
      console.log('Request data:', { username, password });

      const response = await axios.post('/user/login', { username, password });
      console.log('Response:', response);

      if (response.status === 200) {
        // Successful login, redirect to the cashier-main page or perform other actions.
        // You can use React Router to navigate to another page.
        // For example, if you are using React Router, you can use history.push('/cashier-main');
      } else {
        // Handle login failure (e.g., show an error message).
        console.log('Login failed. Response:', response);
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      // Handle any errors that may occur during the API request.
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    window.alert('Please contact your administrator for password assistance.');
  };

  return (
    <div className="login-cashier">
      <div className="centered-content">
        <h1 className='h1-login-sales'>Login as Cashier</h1>
        <div className="input-container">
          <TextField
            type="text"
            label="Username"
            variant="filled"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{style: {fontSize: 24, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
          />
        </div>
        <div className="input-container">
          <TextField
            type="password"
            fullWidth
            label="Password"
            value={password}
            variant='filled'
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{style: {fontSize: 24, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' }}}
          />
        </div>
        <Link to="/cashier-main">
        <button className="btn-login-cashier" onClick={handleLogin}>
          Login
        </button>
        </Link>
        <br></br>
        <div className="forgot-password">
          <span onClick={handleForgotPassword}>Forgot Password?</span>
        </div>
      </div>
    </div>
  );
};

export default LoginCashier;
