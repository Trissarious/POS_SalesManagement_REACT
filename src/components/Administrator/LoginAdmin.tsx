import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './CSS Files/LoginAdmin.css';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../AccountLoginValid/AuthContext';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useAuth(); // Get the context
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

    // Send a POST request to the server
    axios.post('http://localhost:8080/user/loginad', loginRequest)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          // Store the token in a cookie or local storage
          localStorage.setItem('adminToken', token);
          // Successfully logged in
          setIsAdminLoggedIn(true); // Set the login status to true
          localStorage.setItem('adminLoggedIn', 'true');
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
        Don't Have An Account? </button > 
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
