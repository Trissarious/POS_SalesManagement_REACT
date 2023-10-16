import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Confirm forgot password
    // After confirming, you can navigate to "/adminmainpage"
  };

  return (
    <div className="confirm-forgot-password">
      <h1>Confirm Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Re-Enter Password
          <input
            type="password"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
          />
        </label>
        <Link to="/adminmainpage"> {/* Use Link to navigate */}
          <button type="submit">Confirm</button>
        </Link>
      </form>
    </div>
  );
};

export default ChangePassword;
