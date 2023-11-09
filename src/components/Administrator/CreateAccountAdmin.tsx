import React, { useState } from 'react';
import './CSS Files/./CreateAccountAdmin.css';
import axios from 'axios';
import { RestAccount } from '../REST/REST Account/RestAccount';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import 'bootstrap/dist/css/bootstrap.min.css';
import DateFnsUtils from '@mui/x-date-pickers/AdapterDateFns';
import { Visibility, VisibilityOff } from '@mui/icons-material';


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
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const passwordsMatch = password === confirmPassword;
  
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
            variant='outlined'
            label = "Username"
            value={username}
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />

          <TextField
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            label = "Password"
            variant='outlined'
            value={password}
            fullWidth
            onChange={handlePasswordChange}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            label = "Confirm Password"
            variant='outlined'
            value={confirmPassword}
            fullWidth
            onChange={handleConfirmPasswordChange}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {!passwordsMatch && (
            <p style={{ color: 'red', fontSize: 12 }}>Passwords do not match.</p>
          )}

          <TextField
            select
            label="Account Type"
            variant="outlined"
            fullWidth
            value={selectedAccountType}
            onChange={(e) => setSelectedAccountType(e.target.value)}
            InputProps={{ style: { fontSize: 16, fontFamily: 'Poppins', minHeight: '2.5em', height: 'auto', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'  } }}
            style={{ marginBottom: '10px', width: 600 }}
            InputLabelProps={{
              style: { fontSize: 16, fontFamily: 'Poppins'},
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
                <Typography sx={{ fontSize: 16, fontFamily: 'Poppins' }}>{option.label}</Typography>
              </MenuItem>
            ))}
          </TextField>


          <TextField
            type="text"
            variant='outlined'
            label = "Business Name"
            value={business_name}
            fullWidth
            onChange={(e) => setBusiness_name(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />

          <TextField
            variant='outlined'
            type="text"
            label = "Address"
            value={address}
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />
        </div>
        
        <div className="right-column">
        <TextField
            type="text"
            variant='outlined'
            label = "First Name"
            value={fname}
            fullWidth
            onChange={(e) => setFname(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />

        <TextField
            type="text"
            label = "Last Name"
            variant='outlined'
            value={lname}
            fullWidth
            onChange={(e) => setLname(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />
          
          <TextField
            select
            label="Gender"
            variant='outlined'
            fullWidth
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            InputProps={{ style: { fontSize: 16, fontFamily: 'Poppins', minHeight: '2.5em', height: 'auto', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'  } }}
            style={{ marginBottom: '10px', width: 600 }}
            InputLabelProps={{
              style: { fontSize: 16, fontFamily: 'Poppins' },
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
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: 16 }}>
                <Typography sx={{ fontSize: 16, fontFamily: 'Poppins' }}>{option.label}</Typography>
              </MenuItem>
            ))}
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              sx={{
                marginBottom: '10px',
                width: 600,
                '& .MuiInputBase-input': {
                  fontSize: '16px', // Adjust the input font size
                },
                '& .MuiPickersDay-day': {
                  fontSize: '16px', // Adjust the day font size
                },
                '& .MuiPickersYear-root, .MuiPickersYear-yearButton': {
                  fontSize: '16px', // Adjust the year font size
                },
              }}
            />
          </LocalizationProvider>
          

          <TextField
            type="text"
            variant='outlined'
            label = "Email"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />     

        <TextField
            type="text"
            label = "Contact Number"
            variant='outlined'
            value={contactnum}
            fullWidth
            onChange={(e) => setContactnum(e.target.value)}
            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins'}}}
            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
            style={{marginBottom: '10px', width: 600}}
          />
        </div>

        <Button 
          variant="contained"
          sx={{ mt: 3, mb: 2 }} type="submit" 
          onClick={handleSubmit}
          style={{fontSize: 20, fontFamily: 'Poppins', width: 500, padding: 10, backgroundColor: '#4BB543'}}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
