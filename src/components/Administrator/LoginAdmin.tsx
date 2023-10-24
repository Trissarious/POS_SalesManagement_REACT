import React, { useState } from 'react';

import { Link, useNavigate  } from 'react-router-dom';
import './LoginAdmin.css';
import { TextField } from '@mui/material';
import axios from 'axios';

const LoginAdmin = () => {
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
    axios.post('http://localhost:8080/user/loginad', loginRequest)
      .then((response) => {
        if (response.status === 200) {
          // Successfully logged in
          window.alert('Login successful'); // Display a success message
          navigate('/adminmainpage');
        } else {
          window.alert('Login failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        window.alert('Login failed. Please try again.');
      });
  };

  return (
    <div className="starting-screen">
      <div className="centered-content">
        <h1 className='h1-login-sales'>Login as Administrator</h1>
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
      <Link to="/createaccountadmin">
        <button className='btn-register'>
        Don't Have An Account? </button>
      </Link>
      <Link to="/forgotpassword"> {/* Add this Link */}
          <div className="forgot-password">
            <span>Forgot Password?</span>
          </div>
        </Link>
    </div>
  </div>
  );
};

export default LoginAdmin;
