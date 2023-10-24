import React, { useState } from 'react';
import './CSS Files/./CreateAccountAdmin.css';
import axios from 'axios';
import { RestAccount } from '../REST/REST Account/RestAccount';

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
    <div>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Account Type:
        <select value={account_type} onChange={handleDropdownChange}>
          <option value="Administrator">Administrator</option>
          <option value="Cashier">Cashier</option>
          <option value="Sales Manager">Sales Manager</option>
        </select>
      </label>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        First Name:
        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} />
      </label>
      <label>
        Business Name:
        <input
          type="text"
          value={business_name}
          onChange={(e) => setBusiness_name(e.target.value)}
        />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        Contact Number:
        <input type="text" value={contactnum} onChange={(e) => setContactnum(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Create Account</button>
    </div>
  );
}
