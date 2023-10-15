import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/Global Configuration/NavBar.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/Global Configuration/NavBar';
import CashierMainPage from './components/Cashier/CashierMainPage';
import Cashiering from './components/Cashier/Cashiering';
import SalesManagerDashboard from './components/SalesManager/SalesManagerDashboard';
import SalesSummary from './components/SalesManager/SalesSummary';
import ItemPage from './components/SalesManager/ItemPage';
import TransactionHistory from './components/Cashier/TransactionHistory';
import TransactionDetails from './components/Cashier/TransactionDetails';
import CashieringOld from './components/Cashier/CashieringOld';
import LoginCashier from './components/Cashier/LoginCashier';
import StartingScreen from './components/StartingScreen/StartingScreen';
import LoginSalesManager from './components/SalesManager/LoginSalesManager';
import LoginAdmin from './components/Administrator/LoginAdmin';

function App() {

  
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
      <BrowserRouter>
      <Navbar/>
            <Routes>
              <Route path = "/" element = {<StartingScreen/>}/>
              <Route path = "/loginsales" element = {<LoginSalesManager/>}></Route>
              <Route path = "/salesmanagerdb"  element = {<SalesManagerDashboard/>}></Route>
              <Route path = "/salessummary"  element = {<SalesSummary/>}></Route>
              <Route path = "/itempage"  element = {<ItemPage/>}></Route>
              <Route path = "/logincashier" element ={<LoginCashier/>}/>
              <Route path = "/cashier-main" element ={<CashierMainPage />}/>
              <Route path = "/cashiering"  element = {<Cashiering/>}></Route>
              <Route path = "/transactionhistory"  element = {<TransactionHistory/>}></Route>
              <Route path = "/transactions/:id" element ={<TransactionDetails />} />
              <Route path = "/loginadmin" element = {<LoginAdmin/>}/>
              <Route path = "/cart" element = {<CashieringOld/>}></Route>
            </Routes>
        </BrowserRouter> 
    </div>
  );
}

export default App;
