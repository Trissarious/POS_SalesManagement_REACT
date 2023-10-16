import React, { useState } from "react";
import { Link } from 'react-router-dom';  // Import Link

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send email with instructions to reset the password
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <Link to="/changepassword">  {/* Use Link to navigate */}
          <button type="submit">Send Email</button>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
