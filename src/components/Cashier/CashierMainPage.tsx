import React, { useEffect } from 'react';
import { useAuth } from '../AccountLoginValid/AuthContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarCashier from './NavBar Cashier/NavBar Cashier';

export default function CashierMainPage() {
  const { isCashierLoggedIn, setIsCashierLoggedIn, cashierUser } = useAuth();
  const navigate = useNavigate();

  // Token
  useEffect(() => {
   const token = localStorage.getItem('cashierLoggedIn');
   const storedFirstName = localStorage.getItem('cashierFirstName');
   const storedBusinessName = localStorage.getItem('cashierBusinessName');

  if (!token) {
    navigate('/logincashier');
  } else {
    setIsCashierLoggedIn(true);
    axios.get('http://localhost:8080/user/getAllUser')
    .then((response) => {
      console.log('Hello, ', storedFirstName);
      console.log('Business Name:', storedBusinessName);
    })
    .catch((error) => {
      console.error(error);
    });
  }}, [isCashierLoggedIn, navigate, cashierUser]);

    // Logout Function
    const [openLogout, setOpenLogout] = React.useState(false);
    const handleClickOpenLogout = () => { setOpenLogout(true); }
    const handleClickCloseLogout = () => { setOpenLogout(false); }
  
    const handleLogout = () => {
      localStorage.removeItem('cashierToken');
      localStorage.removeItem('cashierLoggedIn')
      localStorage.removeItem('cashierUsername');
      localStorage.removeItem('cashierBusinessName');
      navigate('/logincashier');
    }

  return (
    <div>
      <NavbarCashier/>
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
    </div>
  );
}
