import React, { useState } from 'react';
import './CSS Files/./CreateAccountAdmin.css';
import axios from 'axios';
import { RestAccount } from '../REST/REST Account/RestAccount';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField } from '@mui/material';


const post_account = 'http://localhost:8080/user/postUser';

export default function CreateAccountAdmin() {
  const [deleteByID,getAccountbyId,editAccount,addAccount, account] = RestAccount();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [account_type, setAccount_type] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [business_name, setBusiness_name] = useState('');
  const [address, setAddress] = useState('');
  const [contactnum, setContactnum] = useState('');

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccount_type(e.target.value);
  };

  const handleSubmit = async () => {
    // Axios post to create account
    axios.post(post_account, {
        username: username,
        password: password,
        account_type: account_type,
        email: email,
        fname: fname,
        mname: mname,
        lname: lname,
        business_name: business_name,
        address: address,
        contactnum: contactnum,
      })
      .then((res) => {
        console.log(res.data);
        alert('Account created');
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-div">
      <h1 className='h1-register'>Create an Account</h1>     
      <div className="container-fluid">
      <div className='col-sm-3'>
      <label>
        Username:
        <TextField 
          type="text" 
          value={username} 
          fullWidth
          onChange={(e) => setUsername(e.target.value)} 
          />
      </label>
      <label>
        Password:
        <TextField 
          type="text" 
          value={password} 
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Account Type:
        <select value={account_type} onChange={handleDropdownChange}>
          <option value="Admin">Administrator</option>
          <option value="Cashier">Cashier</option>
          <option value="Sales Manager">Sales Manager</option>
        </select>
      </label>
      <label>
        Email:
        <TextField 
          type="text" 
          fullWidth
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </label>
      <label>
        First Name:
        <TextField 
          type="text" 
          fullWidth
          value={fname} 
          onChange={(e) => setFname(e.target.value)} 
        />
      </label>
      <label>
        Last Name:
        <TextField 
          type="text" 
          value={lname} 
          fullWidth
          onChange={(e) => setLname(e.target.value)} 
        />
      </label>
      <label>
        Business Name:
        <TextField
          type="text"
          fullWidth
          value={business_name}
          onChange={(e) => setBusiness_name(e.target.value)}
        />
      </label>
      <label>
        Address:
        <TextField 
          type="text" 
          fullWidth
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
      </label>
      <label>
        Contact Number:
        <TextField 
          type="text" 
          value={contactnum} 
          fullWidth
          onChange={(e) => setContactnum(e.target.value)} 
          />
      </label>
      <button className='btn-signup' type="submit" onClick={handleSubmit}>Create Account</button>
      </div> 
      </div>
    </div>
  );
}
