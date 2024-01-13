import React from 'react';
import './App.css';
import './components/Global Configuration/NavBar.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/Global Configuration/NavBar';
import CashierMainPage from './components/Cashier/CashierMainPage';
import Cashiering from './components/Cashier/Cashiering';
import SalesSummary from './components/SalesManager/SalesSummary';
import ItemPage from './components/SalesManager/ItemPage';
import TransactionHistory from './components/Cashier/TransactionHistory';
import TransactionDetails from './components/Cashier/TransactionDetails';
import LoginCashier from './components/Cashier/LoginCashier';
import StartingScreen from './components/StartingScreen/StartingScreen';
import LoginSalesManager from './components/SalesManager/LoginSalesManager';
import LoginAdmin from './components/Administrator/LoginAdmin';
import CreateAccountAdmin from './components/Administrator/CreateAccountAdmin';
import ForgotPassword from './components/Administrator/ForgotPassword';
import ChangePassword from './components/Administrator/ChangePassword';
import AdminMainPage from './components/Administrator/AdminMainPage';
import ViewAccounts from './components/Administrator/ViewAccounts';
import { AuthProvider } from './components/AccountLoginValid/AuthContext';
import ImageUploadAccount from './components/Administrator/ImageUploadAccount';

function App() {

  
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
      <AuthProvider>
      <BrowserRouter>
      <Navbar/>
            <Routes>
              <Route path = "/" element = {<StartingScreen/>}/>
              <Route path = "/loginsales" element = {<LoginSalesManager/>}></Route>
              <Route path = "/salessummary"  element = {<SalesSummary/>}></Route>
              <Route path = "/itempage"  element = {<ItemPage/>}></Route>
              <Route path = "/logincashier" element ={<LoginCashier/>}/>
              <Route path = "/cashier-main" element ={<CashierMainPage />}/>
              <Route path = "/cashiering"  element = {<Cashiering/>}></Route>
              <Route path = "/transactionhistory"  element = {<TransactionHistory/>}></Route>
              <Route path = "/transactions/:id" element ={<TransactionDetails />} />
              <Route path = "/loginadmin" element = {<LoginAdmin/>}/>
              <Route path = "/createaccountadmin" element = {<CreateAccountAdmin/>}/>
              <Route path = "/forgotpassword" element = {<ForgotPassword/>}/>
              <Route path = "/changepassword" element = {<ChangePassword/>}/>
              <Route path = "/adminmainpage" element = {<AdminMainPage/>}/>
              <Route path = "/viewaccounts" element = {<ViewAccounts/>}/>
              <Route path = "/imageUpload" element = {<ImageUploadAccount/>}/>
            </Routes>
        </BrowserRouter> 
      </AuthProvider>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
