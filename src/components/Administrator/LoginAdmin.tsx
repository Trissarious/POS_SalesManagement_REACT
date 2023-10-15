import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './LoginAdmin.css'; // You should create a CSS file for styling

const StartingScreen = () => {
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
        <h1>Login as Administrator</h1>
        <div className="input-container">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/cashier-main">
          <button onClick={handleLogin}>Login</button>
        </Link>
        <div className="forgot-password">
          <span onClick={handleForgotPassword}>Forgot Password?</span>
        </div>
      </div>
    </div>
  );
};

export default StartingScreen;
