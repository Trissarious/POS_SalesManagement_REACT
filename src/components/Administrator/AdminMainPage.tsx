import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../AccountLoginValid/AuthContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import NavbarAdmin from "./NavBar Administrator/NavBar Admin";

const TIMEOUT_DURATION = 30 * 60 * 1000;

const AdminMainPage = () => {
  const { isAdminLoggedIn, setIsAdminLoggedIn, adminUser } = useAuth();
  const navigate = useNavigate();

  // Add a timeout duration so that user should login again
  const [lastActivity, setLastActivity] = useState(Date.now());

  //Update last activity timestamp on user interaction
  const handleUserActivity = () => {
    setLastActivity(Date.now());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivity;

      if (timeSinceLastActivity > TIMEOUT_DURATION) {
        // Logout user and redirect to login page
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminUsername");
        localStorage.removeItem("adminBusinessName");
        navigate("/loginadmin");
      }
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, [lastActivity, navigate]);

  // Token
  useEffect(() => {
    const token = localStorage.getItem("adminLoggedIn");
    const storedFirstName = localStorage.getItem("adminFirstName");
    const storedBusinessName = localStorage.getItem("adminBusinessName");

    if (!token) {
      navigate("/loginadmin");
    } else {
      setIsAdminLoggedIn(true);
      axios
        .get("http://localhost:8080/user/getAllUser")
        .then((response) => {
          console.log("Hello, ", storedFirstName);
          console.log("Business Name:", storedBusinessName);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isAdminLoggedIn, navigate, adminUser]);

  // Logout Function
  const [openLogout, setOpenLogout] = React.useState(false);
  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleClickCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminBusinessName");
    navigate("/loginadmin");
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="starting-screen">
        <div className="button-container">
          <Link to="/createaccountadmin">
            <button className="btn-salesmanager">Create New Account</button>
          </Link>
          <br></br>
          <Link to="/viewaccounts">
            <button className="btn-salesmanager">View Accounts</button>
          </Link>
          <br></br>
          <button className="btn-salesmanager" onClick={handleClickOpenLogout}>
            Sign Out
          </button>
        </div>
        <Dialog open={openLogout} onClose={handleClickCloseLogout}>
          <DialogTitle
            sx={{ fontSize: "1.6rem", color: "red", fontWeight: "bold" }}
          >
            Warning!
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontSize: "1.6rem" }}>
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontSize: "15px", fontWeight: "bold" }}
              onClick={handleClickCloseLogout}
            >
              Cancel
            </Button>
            <Button
              sx={{ fontSize: "15px", fontWeight: "bold" }}
              onClick={handleLogout}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminMainPage;
