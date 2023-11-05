import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS FIles/LoginCashier.css';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../AccountLoginValid/AuthContext';

const LoginCashier = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isCashierLoggedIn, setIsCashierLoggedIn } = useAuth(); // Get the context
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem('cashierLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/cashier-main');
    }
  }, [navigate]);

  const handleLogin = () => {
    // Create a request object with the username and password
    const loginRequest = {
      username: username,
      password: password,
    };

    // Send a POST request to the server
    axios.post('http://localhost:8080/user/logincash', loginRequest)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          // Store the token in a cookie or local storage
          localStorage.setItem('cashierToken', token);
          // Successfully logged in
          setIsCashierLoggedIn(true); // Set the login status to true in the context
          localStorage.setItem('cashierLoggedIn', 'true');
          window.alert('Login successful'); // Display a success message
          // Redirect to the '/cashier-main' route
          navigate('/cashier-main');
        } else {
          window.alert('Login failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        window.alert('Login failed. Please try again.');
      });
  };

  const handleForgotPassword = () => {
    window.alert('Please contact your administrator for password assistance.');
  };

  return (
    <div className="starting-screen">
      <div className="centered-content">
        <h1 className="h1-login-sales">Login as Cashier</h1>
        <div className="input-container">
          <TextField
            type="text"
            label="Username"
            variant="filled"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
            InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
          />
        </div>
        <div className="input-container">
          <TextField
            type="password"
            fullWidth
            label="Password"
            value={password}
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
            InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
          />
        </div>
        <button className="btn-login-salesmanager" onClick={handleLogin}>
          Login
        </button>
        <br></br>
        <button className="btn-register" onClick={handleForgotPassword}>
          Don't Have An Account?
        </button>
        <div className="forgot-password">
          <span onClick={handleForgotPassword}>Forgot Password?</span>
        </div>
      </div>
    </div>
  );
};

export default LoginCashier;
