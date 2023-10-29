import React, { useState } from 'react';
import './CSS Files/./CreateAccountAdmin.css';
import axios from 'axios';
import { RestAccount } from '../REST/REST Account/RestAccount';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MenuItem, TextField, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const post_account = 'http://localhost:8080/user/postUser';
const Account_Type = [
  {
    value: 'Administrator',
    label: 'Administrator'
  },
  {
    value: 'Cashier',
    label: 'Cashier'
  },
  {
    value: 'Sales Manager',
    label: 'Sales Manager'
  },
];

const Gender = [
  {
    value: 'Female',
    label: 'Female'
  }, 
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Prefer not to say',
    label: 'Prefer not to say'
  }
]

export default function CreateAccountAdmin() {
  const [deleteByID, getAccountbyId, editAccount, addAccount, account] = RestAccount();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [business_name, setBusiness_name] = useState('');
  const [address, setAddress] = useState('');
  const [contactnum, setContactnum] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); 

  const handleSubmit = async () => {
    // Axios post to create an account
    axios
      .post(post_account, {
        username: username,
        password: password,
        account_type: selectedAccountType,
        email: email,
        fname: fname,
        mname: mname,
        lname: lname,
        business_name: business_name,
        address: address,
        contactnum: contactnum,
        gender: selectedGender,
        // bday: bday
      })
      .then((res) => {
        console.log(res.data);
        alert('Account created');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-div">
      <h1 className="h1-register">Create an Account</h1>
      <div className="container-fluid center-form">
      <div className="left-column">
          <TextField
            type="text"
            label = "Username"
            value={username}
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px'}}
          />

          <TextField
            type="text"
            label = "Password"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px'}}
          />

          <TextField
            select
            label="Account Type"
            fullWidth
            value={selectedAccountType}
            onChange={(e) => setSelectedAccountType(e.target.value)}
            inputProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px'}}
            InputLabelProps={{
              style: { fontSize: 16, fontFamily: 'Poppins' },
            }}
            helperText="Please select your account type."
          >
            {Account_Type.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: 16 }}>
                <Typography sx={{ fontSize: 16, fontFamily: 'Poppins' }}>{option.label}</Typography>
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="text"
            label = "Business Name"
            value={business_name}
            fullWidth
            onChange={(e) => setBusiness_name(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px'}}
          />

          <TextField
            type="text"
            label = "Address"
            value={address}
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px'}}
          />
        </div>
        
        <div className="right-column">
        <TextField
            type="text"
            label = "First Name"
            value={fname}
            fullWidth
            onChange={(e) => setFname(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px'}}
          />

        <TextField
            type="text"
            label = "Last Name"
            value={lname}
            fullWidth
            onChange={(e) => setLname(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px'}}
          />

          <TextField
            type="text"
            label = "Birth Date"
            value={business_name}
            fullWidth
            onChange={(e) => setBusiness_name(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px'}}
          />

          <TextField
            select
            label="Gender"
            fullWidth
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            inputProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px'}}
            InputLabelProps={{
              style: { fontSize: 16, fontFamily: 'Poppins' },
            }}
            helperText="Please select your gender."
          >
            {Gender.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: 16 }}>
                <Typography sx={{ fontSize: 16, fontFamily: 'Poppins' }}>{option.label}</Typography>
              </MenuItem>
            ))}
          </TextField>

        <TextField
            type="text"
            label = "Contact Number"
            value={address}
            fullWidth
            onChange={(e) => setContactnum(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '20px'}}
          />
        </div>

        <button className="btn-signup" type="submit" onClick={handleSubmit}>
          Create Account
        </button>
      </div>
    </div>
  );
}
