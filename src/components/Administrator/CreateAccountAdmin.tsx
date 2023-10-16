import React, { useState } from 'react';
import './CreateAccountAdmin.css';
import axios from 'axios';

interface Account {
  username: string;
  password: string;
  account_type: string;
  email: string;
  fname: string;
  lname: string;
  business_name: string;
  address: string;
  contactnum: string;
}

const CreateAccountAdmin: React.FC = () => {
  const [account, setAccount] = useState<Account>({
    username: '',
    password: '',
    account_type: 'Administrator',
    email: '',
    fname: '',
    lname: '',
    business_name: '',
    address: '',
    contactnum: '',
  });

  const isFormValid = () => {
    return (
      account.username &&
      account.password &&
      account.account_type &&
      account.email &&
      account.fname &&
      account.lname &&
      account.business_name &&
      account.address &&
      account.contactnum
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      console.error('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('/user/postUser', account);

      if (response.status === 200) {
        console.log('Account created:', response.data);
      } else {
        console.error('Account creation failed:', response);
      }
    } catch (error) {
      console.error('Account creation failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={account.username}
          onChange={(e) => setAccount({ ...account, username: e.target.value })}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          value={account.password}
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
        />
      </label>
      <label>
        Account Type:
        <input
          type="text"
          value={account.account_type}
          onChange={(e) => setAccount({ ...account, account_type: e.target.value })}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={account.email}
          onChange={(e) => setAccount({ ...account, email: e.target.value })}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          value={account.fname}
          onChange={(e) => setAccount({ ...account, fname: e.target.value })}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={account.lname}
          onChange={(e) => setAccount({ ...account, lname: e.target.value })}
        />
      </label>
      <label>
        Business Name:
        <input
          type="text"
          value={account.business_name}
          onChange={(e) => setAccount({ ...account, business_name: e.target.value })}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={account.address}
          onChange={(e) => setAccount({ ...account, address: e.target.value })}
        />
      </label>
      <label>
        Contact Number:
        <input
          type="text"
          value={account.contactnum}
          onChange={(e) => setAccount({ ...account, contactnum: e.target.value })}
        />
      </label>
      <button type="submit" disabled={!isFormValid()}>
        Create Account
      </button>
    </form>
  );
};

export default CreateAccountAdmin;
