import React from "react";
import { Link } from "react-router-dom";
import "./AdminMainPage.css";

const AdminMainPage = () => {
  return (
    <div className="confirm-forgot-password">
      <div className="profile-container">
        <div className="profile-picture">
          <img src="/path-to-your-image" alt="Profile" />
        </div>
        <div className="profile-name">Admin</div>
      </div>
      <div className="button-container">
        <div>
          <Link to="/createaccountadmin">
            <button>Create New Account</button>
          </Link>
        </div>
        <div>
          <Link to="/viewaccounts">
            <button>View Accounts</button>
          </Link>
        </div>
        <div className="sign-out-button">
          <Link to="/">
            <button>Sign Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
