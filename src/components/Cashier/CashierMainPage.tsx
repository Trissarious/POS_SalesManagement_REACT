import React, { useEffect, useState } from "react";
import { useAuth } from "../AccountLoginValid/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarCashier from "./NavBar Cashier/NavBar Cashier";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const TIMEOUT_DURATION = 30 * 60 * 1000;

export default function CashierMainPage() {
  const { isCashierLoggedIn, setIsCashierLoggedIn, cashierUser } = useAuth();
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
        localStorage.removeItem("cashierToken");
        localStorage.removeItem("cashierLoggedIn");
        localStorage.removeItem("cashierUsername");
        localStorage.removeItem("cashierBusinessName");
        navigate("/logincashier");
      }
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, [lastActivity, navigate]);

  // Token
  useEffect(() => {
    const token = localStorage.getItem("cashierLoggedIn");
    const storedFirstName = localStorage.getItem("cashierFirstName");
    const storedBusinessName = localStorage.getItem("cashierBusinessName");

    if (!token) {
      navigate("/logincashier");
    } else {
      setIsCashierLoggedIn(true);
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
  }, [isCashierLoggedIn, navigate, cashierUser]);

  // Logout Function
  const [openLogout, setOpenLogout] = React.useState(false);
  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleClickCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("cashierToken");
    localStorage.removeItem("cashierLoggedIn");
    localStorage.removeItem("cashierUsername");
    localStorage.removeItem("cashierBusinessName");
    navigate("/logincashier");
  };

  return (
    <div>
      <NavbarCashier />
      <div className="starting-screen">
        <div className="button-container">
          <Link to="/cashiering">
            <button className="btn-salesmanager">Perform Transaction</button>
          </Link>
          <br></br>
          <Link to="/transactionhistory">
            <button className="btn-salesmanager">Transaction History</button>
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
}
