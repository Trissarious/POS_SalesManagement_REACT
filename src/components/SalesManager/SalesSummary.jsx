import React, { useState, useEffect } from 'react';
import { IconButton, Drawer, List, ListItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AccountLoginValid/AuthContext';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import dashboard from './Images/dashboard.png';
import item_page from './Images/item_page.png';
import sales_summry from './Images/sales_summary.png';
import logout from './Images/logout.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SalesSummary() {
  const { isSalesmanLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [refundss, setRefunds] = useState(0);
  const [returnss, setReturns] = useState(0);

  useEffect(() => {
    // Fetch all transactions when the component mounts
    axios.get('http://localhost:8080/transaction/getAllTransaction')
      .then((response) => {
        const allTransactions = response.data;
        setTransactions(allTransactions);

        // Filter transactions that are both refunded and returned
        const refundedAndReturned = allTransactions.filter(transaction => (
          transaction.refunded === 'refunded' && transaction.returned === 'returned'
        ));

        // Calculate refunds and returns for these transactions
        const refundedAmount = transactions
        .filter(transaction => transaction.refunded === 'refunded')
        .reduce((total, transaction) => total + transaction.total_price, 0);
      
      const returnedAmount = transactions
        .filter(transaction => transaction.returned === 'returned')
        .reduce((total, transaction) => total + transaction.total_price, 0);

        setRefunds(refundedAmount);
        setReturns(returnedAmount);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []);
  // Fetch all transactions when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/transaction/getAllTransaction')
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  const handleLogout = () => {
    // Delete the 'cashierToken' from local storage
    localStorage.removeItem('salesmanToken');
    // Clear the login state
    localStorage.removeItem('salesmanLoggedIn');
    // Redirect to the login page
    navigate('/loginsales');
  };

  useEffect(() => {
    // Check for a valid JWT token on page load
    const token = localStorage.getItem('salesmanToken');

    if (!token) {
      // Redirect to the login page if there's no token
      navigate('/loginsales');
    } else {
      // Verify the token on the server, handle token expiration, etc.
      // If token is valid, setIsCashierLoggedIn(true)
    }
  }, [isSalesmanLoggedIn, navigate]);

  // State to control the open/closed state of the Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const location = useLocation();

  // Function to open the Drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Function to close the Drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const [navigatorColor, setNavigatorColor] = useState('#daede5'); // Set the default color of the navigator
  // Function to highlight the color of the navigator if you are on the page using the color '#daede5'
  useEffect(() => {
    if (location.pathname === '/salessummary') {
      setNavigatorColor('#daede5');
    } else {
      setNavigatorColor('#213458');
    }
  }, [location]);

  
  const grossSales = transactions.reduce((total, transaction) => {
    if (!transaction.refunded && !transaction.returned) {
      return total + transaction.total_price;
    }
    return total;
  }, 0);
  
  const refunds = transactions.reduce((total, transaction) => {
    if (transaction.refunded) {
      return total + transaction.total_price;
    }
    return total;
  }, 0);
  
  const returns = transactions.reduce((total, transaction) => {
    if (transaction.returned) {
      return total + transaction.total_price;
    }
    return total;
  }, 0);
  
  const netSales = grossSales - (refunds + returns);
  
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // Filter transactions for the current month
  const monthlyTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date_time);
    return (
      transactionDate >= startDate && transactionDate <= endDate
    );
  });
  
  // Prepare data for the Line Chart
  const chartData = monthlyTransactions.map((transaction) => ({
    name: transaction.date_time,
    grossSales: transaction.total_price,
    refunds: transaction.refunded ? transaction.total_price : 0,
    returns: transaction.returned ? transaction.total_price : 0,
    netSales:
      transaction.total_price -
      (transaction.refunded ? transaction.total_price : 0) -
      (transaction.returned ? transaction.total_price : 0),
  }));

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowOverallSummary(false);
    // Filter transactions for the selected date
    const filteredData = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date_time);
      return (
        transactionDate.getFullYear() === date.getFullYear() &&
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getDate() === date.getDate()
      );
    });
    setFilteredTransactions(filteredData);
  };
  const handleOverallClick = () => {
    setShowOverallSummary(!showOverallSummary);
  };
  const [showOverallSummary, setShowOverallSummary] = useState(true); // Initialize with overall summary
  
  const renderOverallSummary = () => {
    return (
      <div>
        {/* Overall Summary components */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '29rem' }}>Gross Sales</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '38rem' }}>
            {grossSales.toFixed(2)}
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '29rem' }}>Refunds</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '38rem' }}>{refunds.toFixed(2)}</Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '29rem' }}>Returns</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '38rem' }}>{returns.toFixed(2)}</Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5rem', backgroundColor: '#90B7B8', padding: '0.5rem', borderRadius: '5px', marginLeft: '20rem', marginRight: '25rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Net Sales</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '12.6rem' }}>{netSales.toFixed(2)}</Typography>
        </div>
      </div>
    );
  };
  
  const renderDateSpecificSummary = () => {
    return (
      <div>
        {/* Date-Specific Summary components */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '29rem' }}>Gross Sales</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '38rem' }}>
            {filteredTransactions.reduce((total, transaction) => total + transaction.total_price, 0).toFixed(2)}
          </Typography>
        </div>
  
              {/* Display Refunds */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '29rem' }}>Refunds</Typography>
        <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '38rem' }}>
        {filteredTransactions
  .filter((transaction) => transaction.refunded === true)
  .reduce((total, transaction) => {
    console.log("Reducing Transaction: ", transaction);
    return total + transaction.total_price;
  }, 0)
  .toFixed(2)}
        </Typography>
      </div>

      {/* Display Returns */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '29rem' }}>Returns</Typography>
        <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '38rem' }}>
          {filteredTransactions
            .filter((transaction) => transaction.returned === true)
            .reduce((total, transaction) => total + transaction.total_price, 0)
            .toFixed(2)}
        </Typography>
      </div>

      {/* Calculate Net Sales */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5rem', backgroundColor: '#90B7B8', padding: '0.5rem', borderRadius: '5px', marginLeft: '20rem', marginRight: '25rem' }}>
        <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Net Sales</Typography>
        <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '12.6rem' }}>
          {(
            filteredTransactions.reduce((total, transaction) => total + transaction.total_price, 0) -
            filteredTransactions
              .filter((transaction) => transaction.refunded === 'refunded')
              .reduce((total, transaction) => total + transaction.total_price, 0) -
            filteredTransactions
              .filter((transaction) => transaction.returned === 'returned')
              .reduce((total, transaction) => total + transaction.total_price, 0)
          ).toFixed(2)}
        </Typography>
      </div>
      </div>
    );
  };
  


  return (
    <div>
      {/* Hamburger icon to open the Drawer */}
      <IconButton
        edge="end"
        color="inherit"
        aria-label="open drawer"
        onClick={openDrawer}
        sx={{
          position: 'fixed',
          top: '.5rem',
          right: '2rem',
          fontSize: '6rem',
          zIndex: 999,
        }}
      >
        <MenuIcon sx={{ fontSize: '3rem' }} /> {/* Place the MenuIcon component here */}
      </IconButton>

      {/* Drawer component */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer} sx={{ width: '5rem' }}>
        <List>
          <ListItem button component={Link} to="/salessummary">
            <h2 style={{ fontFamily: 'Poppins' }}>Sales Summary</h2>
          </ListItem>
          <ListItem button component={Link} to="/itempage">
            <h2 style={{ fontFamily: 'Poppins' }}>Item Page</h2>
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <h2 style={{ fontFamily: 'Poppins' }}>Log Out</h2>
          </ListItem>
        </List>
      </Drawer>

      <div className="center">
        {/* Hamburger icon to open the Drawer */}
        <IconButton
          edge="end"
          aria-label="open drawer"
          onClick={openDrawer}
          sx={{
            position: 'fixed',
            top: '.5rem',
            right: '2rem',
            fontSize: '6rem',
            zIndex: 999,
          }}
        >
          <MenuIcon sx={{ fontSize: '3rem' }} /> {/* Place the MenuIcon component here */}
        </IconButton>
        {/* Drawer component */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer} sx={{ width: '5rem' }}>
          <div className="drawer-account">
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center' }}>
              Sales Manager
            </Typography>
          </div>
          <List>

            <ListItem button component={Link} to="/salessummary" className={location.pathname === '/salessummary' ? 'active-link' : ''}>
              <h2 style={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', color: '#213458', padding: 2, margin: 'auto', marginLeft: 5, marginRight: 90 }}>Sales Summary</h2>
              <img src={sales_summry} className="img_cashiering" />
            </ListItem>

            <ListItem button component={Link} to="/itempage" className={location.pathname === '/itempage' ? 'active-link' : ''}>
              <h2 style={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', padding: 2, margin: '#213458', marginRight: 160, marginLeft: 5 }}>Item Page</h2>
              <img src={item_page} className="img_cashiering" />
            </ListItem>

            <ListItem button onClick={handleLogout} className={location.pathname === '/logout' ? 'active-link' : ''}>
              <h2 style={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', color: '#213458', padding: 2, marginRight: 200, marginLeft: 5 }} >Log Out</h2>
              <img src={logout} className='img_cashiering' />
            </ListItem>
          </List>
        </Drawer>

        <Typography variant="h2" style={{ textAlign: 'center', fontWeight: 'bold' }}>
          SALES SUMMARY
        </Typography>
        <div style={{ textAlign: 'center', margin: '2rem' }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
        />
         <button onClick={() => setShowOverallSummary(true)}>Overall</button>
      </div>          
      {showOverallSummary ? renderOverallSummary() : renderDateSpecificSummary()}
        <br></br>
        <br></br>
        <br></br>
        <ResponsiveContainer width="100%" height={300}>
  <LineChart
    data={chartData}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name">
            </XAxis>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="grossSales" name="Gross Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="refunds" name="Refunds" stroke="#ff7300" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="returns" name="Returns" stroke="#413ea0" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="netSales" name="Net Sales" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
