import React, {useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { useAuth } from '../AccountLoginValid/AuthContext';
import './CSS Files/ViewAccounts.css'
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RestAccount } from "../REST/REST Account/RestAccount";

interface Account {
    userid: number,
    username: string,
    account_type: string,
    password: string,
    email: string,
    fname: string,
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


export default function UpdateAccount(props: Account) {
    const [deleteByID, getAccountbyId, editAccount, addAccount, account] = RestAccount();
    const [open, setOpen] = React.useState(false);
    const usernameRef = useRef<HTMLTextAreaElement>();
    const passwordRef = useRef<HTMLTextAreaElement>();
    const emailRef = useRef<HTMLTextAreaElement>();
    const fnameRef = useRef<HTMLTextAreaElement>();
    const lnameRef = useRef<HTMLTextAreaElement>();
    const business_nameRef = useRef<HTMLTextAreaElement>();
    const addressRef = useRef<HTMLTextAreaElement>();
    const contactnumRef = useRef<HTMLTextAreaElement>();
    const account_typeRef = useRef<HTMLTextAreaElement>();
    const genderRef = useRef<HTMLTextAreaElement>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleUpdate = async () => {
        if (selectedDate) {
            // The form is complete, so proceed with the Axios POST request
            const formattedDate = selectedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
        axios.put('http://localhost:8080/user/putUser?userid=' + props.userid, {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
            account_type: account_typeRef.current?.value,
            email: emailRef.current?.value,
            fname: fnameRef.current?.value,
            lname: lnameRef.current?.value,
            business_name: business_nameRef.current?.value,
            address: addressRef.current?.value,
            contactnum: contactnumRef.current?.value,
            gender: genderRef.current?.value,
            bday: formattedDate,
        }).then(res => {
          console.log(res.data)
          window.location.reload()
        }).catch(err => console.log(err))
        } else {
            alert('Pleaes select a birth')
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
      };

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <div>
            <button
                className="btn btn-success btn-lg"
                style={{
                    marginRight: 5,
                    padding: '10px 40px', 
                    fontSize: 20,
                    fontWeight: 'medium'
                }} 
                onClick={handleClickOpen}>Edit</button>

            <button
                className="btn btn-danger btn-lg"
                style={{
                    marginRight: 5,
                    padding: '10px 40px', 
                    fontSize: 20,
                    fontWeight: 'medium'
                }} 
                onClick={() =>deleteByID(props.userid)}>Delete</button>
            
             {/* DIALOG FOR REFUND */}
       <Dialog open={open} onClose={handleClickClose}>
        <DialogContent>
            <Card sx={{maxWidth: 900, borderRadius: 5, backgroundColor: '#f7f5f5', maxHeight: 1000, color: '#213458'}}>
                <CardContent>
                    <Typography gutterBottom variant='h2' component="div" sx={{fontFamily: "Poppins", fontWeight: 'bold'}} align='center'>
                        Do you also want to edit this Account?
                    </Typography>
                </CardContent>
                     <CardActions>
                        <TextField
                            type="text"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            inputRef={usernameRef}
                            defaultValue={props.username}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                    </CardActions>

                    <CardActions>
                        <TextField
                            type={showPassword ? 'text' : 'password'} 
                            fullWidth
                            label="Password"
                            inputRef={passwordRef}
                            defaultValue={props.password}
                            variant='outlined'
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                    <IconButton onClick={togglePasswordVisibility}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                )}}/>

                        <TextField
                            type="text"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            inputRef={emailRef}
                            defaultValue={props.email}
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
                            inputRef={account_typeRef}
                            defaultValue={props.account_type}
                            // onChange={(e) => setSelectedAccountType(e.target.value)}
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
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            inputRef={fnameRef}
                            defaultValue={props.fname}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                        <TextField
                            type="text"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            inputRef={lnameRef}
                            defaultValue={props.lname}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                    </CardActions>

                    <CardActions>
                        <TextField
                            type="text"
                            label="Business Name"
                            variant="outlined"
                            fullWidth
                            inputRef={business_nameRef}
                            defaultValue={props.business_name}
                            inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                            InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                        />
                        <TextField
                            type="text"
                            label="Contact Number"
                            variant="outlined"
                            fullWidth
                            inputRef={contactnumRef}
                            defaultValue={props.contactnum}
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
                            inputRef={addressRef}
                            defaultValue={props.address}
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
                            inputRef={genderRef}
                            defaultValue={props.gender}
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
            <button className="btn-approve" autoFocus onClick={handleUpdate} >Save Changes</button>
        </DialogActions>
        </Dialog>
    
        </div>
    )
}