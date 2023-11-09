import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './CSS Files/LoginAdmin.css';
import { TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import visibility icons
import axios from 'axios';

import { useAuth } from '../AccountLoginValid/AuthContext';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAdminLoggedIn } = useAuth(); // Get the context
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/adminmainpage');
    }
  }, [navigate]);

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
      axios.post('http://localhost:8080/user/loginad', loginRequest)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            const username = response.data.username; // Assuming the API returns the username
            console.log('Username from API response:', username);
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username); // Store the username in local storage
            setIsAdminLoggedIn(true);
            navigate('/adminmainpage');
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
  };

  return (
    <div className="starting-screen">
      <Typography style={{color: "#213458", fontSize: 60, fontWeight: 'bolder', fontFamily: 'Poppins', marginBottom: 20}}>Login as Administrator</Typography>
        <div className="centered-content">
          <div className="input-container">
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{style: {fontSize: 24, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
        />
        </div>
        <div className="input-container">
          <TextField
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            fullWidth
            label="Password"
            value={password}
            variant='outlined'
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{style: {fontSize: 24, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        <button className='btn-login-salesmanager' onClick={handleLogin}>
          Login
        </button>
        <br />
      <Link to="/createaccountadmin">
        <button className='btn-register'>
        Don't Have An Account? </button > 
      </Link>
      <Link to="/forgotpassword" style={{textDecoration: 'none'}}> {/* Add this Link */}
          <div className="forgot-password">
            <span className='forgot-password-text'>Forgot Password?</span>
          </div>
        </Link>
    </div>
  </div>
  );
};

export default LoginAdmin;
