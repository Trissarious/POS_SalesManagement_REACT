import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/Global Configuration/NavBar';
import CashierMainPage from './components/Cashier/CashierMainPage';
import Cashiering from './components/Cashier/Cashiering';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
            <Routes>
              <Route path= '/' element={<CashierMainPage />}/>
              <Route path = "/cashiering"  element = {<Cashiering/>}></Route>
            </Routes>
        </BrowserRouter> 
    </div>
  );
}

export default App;
