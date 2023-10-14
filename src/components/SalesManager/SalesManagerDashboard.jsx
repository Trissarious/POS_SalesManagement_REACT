import React, { useState, useEffect } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon
import { Link } from 'react-router-dom';
//import { Bar } from 'react-chartjs-2';

export default function SalesManagerDashboard() {
  // State to control the open/closed state of the Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <div>
      {/* Hamburger icon to open the Drawer */}
      <IconButton
        edge="end" // Position the icon to the right
        color="inherit"
        aria-label="open drawer"
        onClick={openDrawer}
        sx={{
          position: 'fixed',
          top: '1rem',
          right: '2rem', // Adjust the right property to add margin
          fontSize: '6rem', // Adjust the font size to resize the icon
          zIndex: 999, // Ensure the icon appears above other content
        }}
      >
        <MenuIcon /> {/* Place the MenuIcon component here */}
      </IconButton>

      {/* Drawer component */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer} sx={{ width: '250px' }}>
        <List>
          {/* Renamed ListItem buttons */}
          <ListItem button component={Link} to="/salessummary">
            <ListItemText primary="Sales Summary" sx={{ fontSize: '1.5rem' }} /> {/* Adjust font size */}
          </ListItem>
          <ListItem button component={Link} to="/itempage">
            <ListItemText primary="Item Page" sx={{ fontSize: '1.5rem' }} /> {/* Adjust font size */}
          </ListItem>
          <ListItem button sx={{ fontSize: '1.5rem' }}> {/* Adjust font size */}
            <ListItemText primary="Logout" />
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
            500 {/* Replace with the actual integer */}
          </Box>
        </div>

        {/* Your main content goes here */}
      </div>
    </div>
  );
}
