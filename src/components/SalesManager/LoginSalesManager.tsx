import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LoginSalesManager.css'; 
import axios from 'axios';

const LoginSalesManager = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleLogin = () => {
    // Create a request object with the username and password
    const loginRequest = {
      username: username,
      password: password,
    };

    // Send a POST request to the server
    axios.post('http://localhost:8080/user/loginsales', loginRequest)
      .then((response) => {
        if (response.status === 200) {
          // Successfully logged in
          window.alert('Login successful'); // Display a success message
          navigate('/salesmanagerdb');
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
        <h1 className='h1-login-sales'>Login as Sales Manager</h1>
        <div className="input-container">
          <TextField
            type="text"
            label="Username"
            variant="filled"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{style: {fontSize: 24, fontFamily: 'Poppins'}}
          }
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
            inputProps={{style: {fontSize: 24, fontFamily: 'Poppins'}}
          }
          InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
        />
        </div>
        <button className='btn-login-salesmanager' onClick={handleLogin}>
          Login
        </button>
        <br />
        <button className='btn-register' onClick={handleForgotPassword}>
        Don't Have An Account?
        </button>
        <div className="forgot-password">
          <span onClick={handleForgotPassword}>Forgot Password?</span>
        </div>
      </div>
    </div>
  );
};

export default LoginSalesManager;
