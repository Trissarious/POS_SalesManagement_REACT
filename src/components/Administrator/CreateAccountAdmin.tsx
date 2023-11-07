import React, { useState } from 'react';
import './CSS Files/./CreateAccountAdmin.css';
import axios from 'axios';
import { RestAccount } from '../REST/REST Account/RestAccount';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MenuItem, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    value: 'Prefer not to say.',
    label: 'Prefer not to say.'
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFormValid, setFormValid] = useState(true); 

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

   // Function to check if all required fields are filled
   const isFormComplete = () => {
    return (
      username.trim() !== '' &&
      password.trim() !== '' &&
      selectedAccountType.trim() !== '' &&
      fname.trim() !== '' &&
      lname.trim() !== '' &&
      selectedDate !== null &&
      contactnum.trim() !== ''
    );
  };

  const handleSubmit = async () => {
    if (isFormComplete()) {
      if (selectedDate) {
        // The form is complete, so proceed with the Axios POST request
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

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
            bday: formattedDate,
          })
          .then((res) => {
            alert('Account created');
            console.log(res.data);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      } else {
        alert('Please select a birth date.');
      }
    } else {
      // The form is incomplete, show an error message
      setFormValid(false);
    }
  };
  
  return (
    <div className="register-div">
       {/* Display an error message if the form is not complete */}
       {!isFormValid && (
        <p className="error-message">Please fill in all required fields.</p>
        
      )}
      <h1 className="h1-register">Create an Account</h1>
      <div className="container-fluid center-form">
      <div className="left-column">
        
          <TextField
            type="text"
            variant='filled'
            label = "Username"
            value={username}
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{style: {fontSize: 25, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 25, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />

          <TextField
            type="text"
            label = "Password"
            variant='filled'
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{style: {fontSize: 25, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 25, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />

          <TextField
            select
            label="Account Type"
            variant="filled"
            fullWidth
            value={selectedAccountType}
            onChange={(e) => setSelectedAccountType(e.target.value)}
            InputProps={{ style: { fontSize: 25, fontFamily: 'Poppins', minHeight: '2.5em', height: 'auto', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'  } }}
            style={{ marginBottom: '10px', width: 600 }}
            InputLabelProps={{
              style: { fontSize: 25, fontFamily: 'Poppins'},
            }}
            FormHelperTextProps={{
              style: {
                fontSize: 14,
                fontFamily: 'Poppins',
              },
            }}
            helperText="Please select your account type."
          >
            {Account_Type.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                <Typography sx={{ fontSize: 25, fontFamily: 'Poppins' }}>{option.label}</Typography>
              </MenuItem>
            ))}
          </TextField>


          <TextField
            type="text"
            variant='filled'
            label = "Business Name"
            value={business_name}
            fullWidth
            onChange={(e) => setBusiness_name(e.target.value)}
            inputProps={{style: {fontSize: 25, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 25, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />

          <TextField
            variant='filled'
            type="text"
            label = "Address"
            value={address}
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
            inputProps={{style: {fontSize: 25, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 25, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />
        </div>
        
        <div className="right-column">
        <TextField
            type="text"
            variant='filled'
            label = "First Name"
            value={fname}
            fullWidth
            onChange={(e) => setFname(e.target.value)}
            inputProps={{style: {fontSize: 25, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 25, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />

        <TextField
            type="text"
            label = "Last Name"
            variant='filled'
            value={lname}
            fullWidth
            onChange={(e) => setLname(e.target.value)}
            inputProps={{style: {fontSize: 25, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 25, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              sx={{
                marginBottom: '10px',
                width: 600,
                '& .MuiInputBase-input': {
                  fontSize: '25px', // Adjust the input font size
                },
                '& .MuiPickersDay-day': {
                  fontSize: '50px', // Adjust the day font size
                },
                '& .MuiPickersYear-root, .MuiPickersYear-yearButton': {
                  fontSize: '50px', // Adjust the year font size
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            select
            label="Gender"
            variant='filled'
            fullWidth
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            InputProps={{ style: { fontSize: 25, fontFamily: 'Poppins', minHeight: '2.5em', height: 'auto', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'  } }}
            style={{ marginBottom: '10px', width: 600 }}
            InputLabelProps={{
              style: { fontSize: 25, fontFamily: 'Poppins' },
            }}
            // Use FormHelperTextProps to set the font size of the helper text
            FormHelperTextProps={{
              style: {
                fontSize: 14, // Adjust the font size as needed
                fontFamily: 'Poppins',
              },
            }}
            helperText="Please select your gender."
          >
            {Gender.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: 25 }}>
                <Typography sx={{ fontSize: 25, fontFamily: 'Poppins' }}>{option.label}</Typography>
              </MenuItem>
            ))}
          </TextField>

        <TextField
            type="text"
            label = "Contact Number"
            variant='filled'
            value={contactnum}
            fullWidth
            onChange={(e) => setContactnum(e.target.value)}
            inputProps={{style: {fontSize: 25, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 25, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />
        </div>

        <button className="btn-signup" type="submit" onClick={handleSubmit}>
          Create Account
        </button>
      </div>
    </div>
  );
}
