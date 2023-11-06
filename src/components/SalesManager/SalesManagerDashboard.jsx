import React, { useState, useEffect } from 'react';
import { IconButton, Drawer, List, ListItem, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dashboard from './Images/dashboard.png';
import item_page from './Images/item_page.png';
import sales_summry from './Images/sales_summary.png'
import logout from './Images/logout.png'
import { useAuth } from '../AccountLoginValid/AuthContext';

export default function SalesManagerDashboard() {
  const { isSalesmanLoggedIn } = useAuth();
  const navigate = useNavigate();

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const location = useLocation();


  // Function to open the Drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Function to close the Drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Update the current date when the component mounts
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Format the current date as a string
  const formattedDate = currentDate.toLocaleDateString();

  const [navigatorColor, setNavigatorColor] = useState('#daede5'); // Set the default color of the navigator
    // Function to highlight the color of the navigator if you are in the page using the color '#daede5'
    useEffect(() => {
        if (location.pathname === '/salesmanagerdb') {
            setNavigatorColor('#daede5');
        } else {
            setNavigatorColor('#213458');
        }
    }, [location]);

  return (
    <div>
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
            }}>
            <MenuIcon sx={{ fontSize: '3rem'}}/> {/* Place the MenuIcon component here */}
            </IconButton>
            {/* Drawer component */}
            <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer} sx={{ width: '5rem'}}>
                <div className='drawer-account'>
                    <Typography sx={{fontFamily:'Poppins', fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center'}}>Cashier</Typography>
                </div>
                <List>
                    <ListItem button component={Link} to="/salesmanagerdb" className={location.pathname === '/salesmanagerdb' ? 'active-link' : ''}>
                        <h2 style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', color: '#213458', padding: 2, margin: 'auto', marginLeft: 5, marginRight: 150}}>Dashboard</h2>
                        <img src={dashboard} className="img_cashiering"/>
                    </ListItem>
                    
                    <ListItem button component={Link} to="/salessummary" className={location.pathname === '/salessummary' ? 'active-link' : ''}>
                        <h2 style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', color: '#213458', padding: 2, margin: 'auto', marginLeft: 5, marginRight: 90}}>Sales Summary</h2>
                        <img src={sales_summry} className="img_cashiering"/>
                    </ListItem>

                    <ListItem button component={Link} to="/itempage" className={location.pathname === '/itempage' ? 'active-link' : ''}>
                    <h2 style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', padding: 2, margin: 'auto', marginRight: 160, marginLeft: 5}}>Item Page</h2>
                    <img src={item_page} className="img_cashiering" />
                    </ListItem>

                    <ListItem className={location.pathname === '/logout' ? 'active-link' : ''}>
                        <h2 style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', color: '#213458', padding: 2, marginRight: 200, marginLeft: 5}}>Log Out</h2>
                        <img src={logout} className='img_cashiering'/> 
                    </ListItem>
                </List>
            </Drawer>

      {/* Main content */}
      <div className="center">
        {/* Display the formatted date at the top center */}
        <Typography variant="h2" style={{ textAlign: 'center' }}>
          {formattedDate}
        </Typography>

        {/* Display the three text items side by side with margin and updated font sizes */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '23rem' }}>Net Sales</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' }}>Gross Sales</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '25rem' }}>Returns</Typography>
        </div>

        {/* Display rectangles with integers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Box
            sx={{
              backgroundColor: '#F0F0F0',
              padding: '1rem',
              borderRadius: '5px',
              fontSize: '1.5rem',
              width: '200px', // Adjust width
              height: '50px', // Adjust height
              marginLeft: '21rem' ,
              textAlign: 'center',
            }}
          >
            1000 {/* Replace with the actual integer */}
          </Box>
          <Box
            sx={{
              backgroundColor: '#F0F0F0',
              padding: '1rem',
              borderRadius: '5px',
              fontSize: '1.5rem',
              width: '200px', // Adjust width
              height: '50px', // Adjust height
              textAlign: 'center',
            }}
          >
            2000 {/* Replace with the actual integer */}
          </Box>
          <Box
            sx={{
              backgroundColor: '#F0F0F0',
              padding: '1rem',
              borderRadius: '5px',
              fontSize: '1.5rem',
              width: '200px', // Adjust width
              height: '50px', // Adjust height
              marginRight: '21rem',
              textAlign: 'center',
            }}
          >
            500
          </Box>
        </div>

        {/* Your main content goes here */}
      </div>
    </div>
  );
}
