import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginAdmin.css';
import { TextField } from '@mui/material';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate login logic (replace this with your actual logic)
    if (username === 'yourUsername' && password === 'yourPassword') {
      // The Link component will handle the navigation
      // No need to use useHistory in this approach
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    window.alert('Please contact your administrator for password assistance.');
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
          InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
        />
      </div>
      <Link to="/adminmainpage">
        <button className='btn-login-salesmanager' 
          onClick={handleLogin}>
        Login</button>
      </Link>
      <br></br>
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
