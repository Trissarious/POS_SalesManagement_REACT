import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { RestAccount } from "../REST/REST Account/RestAccount";
import axios from "axios";

const ChangePassword = () => {
  const [deleteByID, getAccountbyId, editAccount, addAccount, account] = RestAccount();
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // TODO: Add validation for password and re-enter password match
  
    // Extract the reset token from the URL (assuming it's passed as a query parameter)
    const resetToken = new URLSearchParams(window.location.search).get('token');
  
    try {
      // Make a request to change the password
      const response = await axios.put(
        `http://localhost:8080/user/changepassword?resetToken=${resetToken}`,
        {
          password: password,
        }
      );
  
      // Handle success (you can redirect the user or show a success message)
      console.log(response.data);
    } catch (error) {
      // Handle errors (you can show an error message)
      console.error(error);
    }
  };
  
  

  return (
    <div className="confirm-forgot-password">
      <h1>Confirm Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
