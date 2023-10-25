import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS FIles/LoginCashier.css';  
import { TextField, IconButton, InputAdornment, Input } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import visibility icons
import { Link } from "react-router-dom";
import axios from 'axios';

const LoginCashier = () => { // Accept the setIsLoggedIn prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Create a request object with the username and password
    const loginRequest = {
      username: username,
      password: password,
    };

    // Check if the username and password are not empty
  if (!loginRequest.username || !loginRequest.password) {
    window.alert('Please enter both your username and password');
  } else {
    // Send a POST request to the server
    axios.post('http://localhost:8080/user/logincash', loginRequest)
      .then((response) => {
        if (response.status === 200) {
            navigate('/cashier-main');
        } else {
          window.alert('Please enter your username and password');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        window.alert('The username or password you’ve entered is incorrect. Please try again.');
      });
  }

};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
   
  const handleForgotPassword = () => {
    window.alert('Please contact your administrator for password assistance.');
  };

  return (
    <div className="starting-screen">
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
          type={showPassword ? 'text' : 'password'}
          fullWidth
          label="Password"
          value={password}
          variant='filled'
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{style: {fontSize: 24, fontFamily: 'Poppins'}}}
          InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
          InputProps={{
            endAdornment :
              <InputAdornment position='end'>
                  <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
              </InputAdornment>
          }}
        />
      </div>

        <button className='btn-login-salesmanager' 
          onClick={handleLogin}>
        Login</button>

      <br></br>

        <button className='btn-register' 
          onClick={handleLogin}>
        Don't Have An Account? </button>
        
      <div className="forgot-password">
        <span onClick={handleForgotPassword}>Forgot Password?</span>
      </div>
    </div>
  </div>
  );
};

export default LoginCashier;
