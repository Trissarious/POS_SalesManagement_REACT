import { IconButton, Drawer, List, ListItem, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AccountLoginValid/AuthContext';


export default function ItemPage() {

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

  // Function to open the Drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Function to close the Drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

    <title>Cashiering</title>
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
        <MenuIcon sx={{ fontSize: '3rem'}}/> {/* Place the MenuIcon component here */}
      </IconButton>

      {/* Drawer component */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer} sx={{ width: '5rem' }}>
        <List>
          <ListItem button component={Link} to="/salessummary">
            <h2 
              style={{fontFamily: 'Poppins'}}
            
            >Sales Summary</h2>
          </ListItem>
          <ListItem button component={Link} to="/itempage">
          <h2 
              style={{fontFamily: 'Poppins'}}
            
            >Item Page</h2>
          </ListItem>
          <ListItem button onClick={handleLogout}>
          <h2
              style={{fontFamily: 'Poppins'}}
            
            >Log Out</h2>
          </ListItem>
        </List>
      </Drawer>

        <div className='center'>
            <Typography variant="h2" style={{ textAlign: 'center', fontWeight: 'bold' }}>
            ITEMS
            </Typography>

            <div style={{ marginTop: '2rem', backgroundColor: '#90B7B8', padding: '0.5rem', borderRadius: '5px', marginLeft: '20rem', marginRight: '25rem' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Best Selling</Typography>
  </div>

  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Item 1</Typography>
    <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '12.6rem' }}>2x</Typography>
  </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Total Sales: P40.00</Typography>
          </div>
         </div>
   
         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', backgroundColor: '#D3D3D3', padding: '0.5rem', borderRadius: '5px', marginLeft: '22rem', marginRight: '27rem' }}>
          <Typography variant="h2" style={{ marginLeft: '8.6rem' }}>Item 1</Typography>
          <Typography variant="h2" style={{ marginRight: '12.6rem' }}>Stocks: 28</Typography>
        </div>  
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', backgroundColor: '#D3D3D3', padding: '0.5rem', borderRadius: '5px', marginLeft: '22rem', marginRight: '27rem' }}>
          <Typography variant="h2" style={{ marginLeft: '8.6rem' }}>Item 1</Typography>
          <Typography variant="h2" style={{ marginRight: '12.6rem' }}>Stocks: 12</Typography>
        </div>                   
        </div>
        </div>
    );
    }