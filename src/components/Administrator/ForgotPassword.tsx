import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend to initiate the password reset process
      const response = await axios.post('http://localhost:8080/user/forgotpassword', { email: email });
      console.log(response.data);
      alert('Reset Password confirmation successfully.')
    } catch (error) {
      alert('Email not found.')
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      <Link to="/login">Remembered your password? Login here.</Link>
    </div>
  );
};

export default ForgotPassword;
