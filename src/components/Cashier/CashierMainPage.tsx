import React, { useEffect } from 'react';
import { useAuth } from '../AccountLoginValid/AuthContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function CashierMainPage() {
  const { isCashierLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      localStorage.removeItem('cashierToken');
      localStorage.removeItem('cashierLoggedIn');
      navigate('/logincashier');
    }
  };

  useEffect(() => {
    // Check for a valid JWT token on page load
    const token = localStorage.getItem('cashierToken');

    if (!token) {
      // Redirect to the login page if there's no token
      navigate('/logincashier');
    } else {
      // Verify the token on the server, handle token expiration, etc.
      // If token is valid, setIsCashierLoggedIn(true)
    }
  }, [isCashierLoggedIn, navigate]);

  return (
    <div className="center-bod">
      <div className="button-container">
        <Link to="/cashiering">
          <button className="button1">Perform Transaction</button>
        </Link>
        <br></br>
        <Link to="/transactionhistory">
          <button className="button2">Transaction History</button>
        </Link>
        <br></br>
        <button className= "button2" onClick={handleLogout}>Logout</button>
      </div>
      <Outlet />
    </div>
  );
}
