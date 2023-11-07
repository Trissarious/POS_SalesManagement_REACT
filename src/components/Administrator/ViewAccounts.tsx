import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from '@mui/material';
import { useAuth } from '../AccountLoginValid/AuthContext';
import './CSS Files/ViewAccounts.css'
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface Account {
  userid: number,
  username: string,
  account_type: string,
  password: string,
  email: string,
  fname: string,
  mname: string,
  lname: string,
  business_name: string,
  address: string,
  contactnum: string,
  gender: string,
  bday: string
}

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

export default function ViewAccounts() {
  const { isAdminLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [business_name, setBusiness_name] = useState('');
  const [address, setAddress] = useState('');
  const [contactnum, setContactnum] = useState('');

  useEffect(() => {
    // Check for a valid JWT token on page load
    const token = localStorage.getItem('adminToken');

    if (!token) {
      // Redirect to the login page if there's no token
      navigate('/loginadmin');
    } else {
      // Verify the token on the server, handle token expiration, etc.
      // If token is valid, setIsCashierLoggedIn(true)
    }
  }, [isAdminLoggedIn, navigate]);

    const [searchInput, setSearchInput] = useState('');
    const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
    const handleSearch = (searchValue: string) => {
        setSearchInput(searchValue);
        const filtered = accounts.filter((account) =>
            String(account.username).includes(searchValue)
        );
        setFilteredAccounts(filtered);
    };


    useEffect(() => {
        axios.get('http://localhost:8080/user/getAllUser')
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
      };

  return (
    <div className="confirm-forgot-password">
      <div className="profile-container">
        <div className="profile-picture">
          <img src="/path-to-your-image" alt="Profile" />
        </div>
        <div className="profile-name">Admin</div>
      </div>

       <div className="account-container">

                <input
                    type="text"
                    placeholder="Search username"
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ 
                        alignContent: 'right',
                        marginTop: 10,
                        marginRight: 0,
                        marginLeft: 850,
                        marginBottom: 10,
                        width: 500,
                        padding: 10,
                        fontSize: '16px',
                        fontWeight: 'bolder'
                    }}
                />
        
            
            <div className="account-table-container">      
            {searchInput && filteredAccounts.length === 0 ? (
                <p style={{ marginTop: '100px', textAlign: 'center', fontSize: '30px', fontWeight: 'bolder' }}>Account not found.</p>
            ) : (
                <table className="account-table" style={{maxWidth: '90%'}}>
                    <thead>
                        <tr>
                            <th>Accounts</th>
                            <th style={{maxWidth:200}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchInput
                            ? filteredAccounts.map((account) => (
                            <tr key={account.userid}>
                                   <td style={{color: '#213458'}}>
                                    <div style={{fontWeight: 'bold', fontSize: 30}}>{account.username}</div> 
                                    <div style={{fontSize: 20, fontStyle: 'italic'}}>Account Type: {account.account_type}</div>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-success btn-lg"
                                        style={{
                                            marginRight: 5,
                                            padding: '10px 40px', 
                                            fontSize: 20,
                                            fontWeight: 'medium'
                                        }}
                                        onClick={handleClickOpen}
                                        >
                                        Edit
                                        </button>
                                </td>

                            </tr>
                            ))
                            : accounts.map((account) => (
                            <tr key={account.userid}>
                                <td style={{color: '#213458'}}>
                                    <div style={{fontWeight: 'bold', fontSize: 30}}>{account.username}</div> 
                                    <div style={{fontSize: 20, fontStyle: 'italic'}}>Account Type: {account.account_type}</div>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-success btn-lg"
                                        style={{
                                            marginRight: 5,
                                            padding: '10px 40px', 
                                            fontSize: 20,
                                            fontWeight: 'medium'
                                        }}
                                        onClick={handleClickOpen}
                                        >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
       </div> 


       {/* DIALOG FOR REFUND */}
       <Dialog open={open} onClose={handleClickClose}>
        <DialogContent>
            <Card sx={{maxWidth: 900, borderRadius: 5, backgroundColor: '#f7f5f5', maxHeight: 1000, color: '#213458'}}>
                <CardContent>
                    <Typography gutterBottom variant='h2' component="div" sx={{fontFamily: "Poppins", fontWeight: 'bold'}} align='center'>
                        Edit this Account?
                    </Typography>
                </CardContent>
                     <CardActions>
                        <TextField
                            type="text"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                        <TextField
                             type='password'
                             fullWidth
                             label="Password"
                             value={password}
                             variant='outlined'
                             onChange={(e) => setPassword(e.target.value)}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                    </CardActions>
                    <CardActions>
                        <TextField
                            select
                            label="Account Type"
                            variant="outlined"
                            fullWidth
                            value={selectedAccountType}
                            onChange={(e) => setSelectedAccountType(e.target.value)}
                            InputProps={{ style: { fontSize: 16, fontFamily: 'Poppins', minHeight: '2.5em', height: 'auto', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'  } }}
                            style={{ width: 600 }}
                            InputLabelProps={{
                            style: { fontSize: 16, fontFamily: 'Poppins'},
                            }}
                            FormHelperTextProps={{
                            style: {
                                fontSize: 12,
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
                    </CardActions>

                    <CardActions>
                        <TextField
                            type="text"
                            label="Business Name"
                            variant="outlined"
                            fullWidth
                            value={business_name}
                            onChange={(e) => setBusiness_name(e.target.value)}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                        <TextField
                            type="text"
                            label="Contact Number"
                            variant="outlined"
                            fullWidth
                            value={contactnum}
                            onChange={(e) => setContactnum(e.target.value)}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                    </CardActions>

                    <CardActions>
                        <TextField
                            type="text"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                    </CardActions>

                    <CardActions>
                        <TextField
                            type="text"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                        <TextField
                            type="text"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                    </CardActions>

                    <CardActions>
                         <TextField
                            select
                            label="Gender"
                            variant='outlined'
                            fullWidth
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            InputProps={{ style: { fontSize: 16, fontFamily: 'Poppins', minHeight: '2.5em', height: 'auto', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'  } }}
                            style={{ width: 600 }}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' },}}>
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
                                width: 600,
                                '& .MuiInputBase-input': {
                                fontSize: 16, // Adjust the input font size
                                },
                                '& .MuiPickersDay-day': {
                                fontSize: 16, // Adjust the day font size
                                },
                                '& .MuiPickersYear-root, .MuiPickersYear-yearButton': {
                                fontSize: 16, // Adjust the year font size
                                },
                            }}
                            />
                        </LocalizationProvider>
                    </CardActions>
            </Card>
        </DialogContent>
        <DialogActions>
            <button className="btn-cancel" onClick={handleClickClose}>Cancel</button>
            <button className="btn-approve" >Update</button>
        </DialogActions>
        </Dialog>
    
      </div>
  );
}
