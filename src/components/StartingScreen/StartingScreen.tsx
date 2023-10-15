import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './StartingScreen.css'; // You should create a CSS file for styling

const StartingScreen = () => {
  return (
    <div className="starting-screen">
      <h1>POS Sales Management</h1>
      <div className="button-container">
                <Link to="/loginsales"><button className='button1'>Sales Manager</button></Link>
                <br></br>
                <Link to="/logincashier"><button className='button2'>Cashier</button></Link>
                <br></br>
                <Link to="/loginadmin"><button className='button2'>Administrator</button></Link>
            </div>
    </div>
  );
};

export default StartingScreen;
