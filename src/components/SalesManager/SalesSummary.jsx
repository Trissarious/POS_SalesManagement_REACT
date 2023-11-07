import { IconButton, Drawer, List, ListItem, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon
import React, { useState, useEffect } from 'react';
import dashboard from './Images/dashboard.png';
import item_page from './Images/item_page.png';
import sales_summry from './Images/sales_summary.png'
import logout from './Images/logout.png'
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { useAuth } from '../AccountLoginValid/AuthContext';


export default function SalesSummary() {

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
  // Function to highlight the color of the navigator if you are in the page using the color '#daede5'
  useEffect(() => {
      if (location.pathname === '/salessummary') {
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
                    <Typography sx={{fontFamily:'Poppins', fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center'}}>Sales Manager</Typography>
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
                    <h2 style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', padding: 2, margin: '#213458', marginRight: 160, marginLeft: 5}}>Item Page</h2>
                    <img src={item_page} className="img_cashiering" />
                    </ListItem>

                    <ListItem button onClick={handleLogout} className={location.pathname === '/logout' ? 'active-link' : ''} >
                        <h2 style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', color: '#213458', padding: 2, marginRight: 200, marginLeft: 5}} >Log Out</h2>
                        <img src={logout} className='img_cashiering'/> 
                    </ListItem>
                </List>
            </Drawer>
            
        <Typography variant="h2" style={{ textAlign: 'center', fontWeight: 'bold' }}>
          SALES SUMMARY
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Gross Sales</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div>   

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Refunds</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div> 

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Discounts</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div> 

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Returns</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div> 

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5rem', backgroundColor: '#90B7B8', padding: '0.5rem', borderRadius: '5px', marginLeft: '20rem', marginRight: '25rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Net Sales</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '12.6rem' }}>0.00</Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Totals</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div> 
        </div>
        </div>
    );
    }