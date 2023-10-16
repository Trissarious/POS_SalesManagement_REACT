import React from 'react';
import { Link } from 'react-router-dom';
import './StartingScreen.css'; // You should create a CSS file for styling

const StartingScreen = () => {
  return (
    <div className="starting-screen">
      <h1 className='h1-startingscreen'>POS</h1>
      <h1 className='h1-startingscreen'>SALES MANAGEMENT</h1>
      <div className="button-container">
                <Link to="/loginsales"><button className='btn-salesmanager'>Sales Manager</button></Link>
                <br></br>
                <Link to="/logincashier"><button className='btn-cashier'>Cashier</button></Link>
                <br></br>
                <Link to="/loginadmin"><button className='btn-admin'>Administrator</button></Link>
            </div>
    </div>
  );
};

export default StartingScreen;
