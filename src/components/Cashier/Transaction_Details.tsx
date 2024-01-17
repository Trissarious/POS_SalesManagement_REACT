import React, { useState, useEffect, useRef } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import './CSS FIles/TransactionDetails.css'; 
import { Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AccountLoginValid/AuthContext';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Product {
    productid: number;
    productname: string;
    quantity: number;
    price: number;
}

interface TransactionDetails {
    transactionid: number;
    total_quantity: number;
    total_price: number;
    tendered_bill: number;
    balance: number;
    customer_name: string;
    customer_num: string;
    customer_email: string;
    date_time: string;
    refunded: boolean;
    returned: boolean;
}


const Transaction_Details = (props_transaction: TransactionDetails) => {
    const { isCashierLoggedIn } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('cashierToken');
  
      if (!token) {
        navigate('/logincashier');
      } else {
      }
    }, [isCashierLoggedIn, navigate]);

    const { id } = useParams();
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>();
    const [products, setProducts] = useState<Product[]>([]);
    const [refunded, setRefunded] = useState(false);
    const [returned, setReturned] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openRefund, setOpenRefund] = React.useState(false);
    const [openReturn, setOpenReturn] = React.useState(false);
    const [initialUsername] = useState('');
    const [initialPassword] = useState('');

    const handleLoginForRefund = () => {
        const loginRequest = {
          username: username,
          password: password,
        };
    
        // Check if the username and password are not empty
        if (!loginRequest.username || !loginRequest.password) {
          window.alert('Please enter both your username and password');
        } else {
          // Send a POST request to the server
          axios.post('http://localhost:8080/user/loginsales', loginRequest)
            .then((response) => {
              if (response.status === 200) {
                // Insert code for approval ^-^
                    const confirmed = window.confirm('Are you sure you want to refund?');
                    if (confirmed) {
                        setRefunded(true);
                        axios.put(`http://localhost:8080/transaction/isRefunded?transactionid=${id}`, { refunded: true })
                          .then((response) => {
                              window.confirm(`Transaction ${id} has been refunded.`);
                              console.log('Refund successful:', response.data);
                              window.location.reload();
                          })
                          .catch((error) => {
                              console.error(error);
                              window.alert(`Failed to refund transaction ${id}.`);
                          });
                    }
              } else {
                window.alert('Please enter your username and password');
              }
            })
            .catch((error) => {
              console.error('Login failed:', error);
              window.alert('The username or password you’ve entered is incorrect. Please try again.');
            });
          }   
      };

      const handleLoginForReturn = () => {
        const loginRequest = {
          username: username,
          password: password,
        };
    
        // Check if the username and password are not empty
        if (!loginRequest.username || !loginRequest.password) {
          window.alert('Please enter both your username and password');
        } else {
          // Send a POST request to the server
          axios.post('http://localhost:8080/user/loginsales', loginRequest)
            .then((response) => {
              if (response.status === 200) {
                // Insert code for approval ^-^
                const confirmed = window.confirm('Are you sure you want to return item?');
                if (confirmed) {
                    setReturned(true);
                    axios.put(`http://localhost:8080/transaction/isReturned?transactionid=${id}`, { returned: true })
                      .then((response) => {
                          window.confirm(`Transaction ${id} has been returned.`);
                          console.log('Return successful:', response.data);
                          window.location.reload();
                      })
                      .catch((error) => {
                          console.error(error);
                          window.alert(`Failed to return transaction ${id}.`);
                      });
                }
              } else {
                window.alert('Please enter your username and password');
              }
            })
            .catch((error) => {
              console.error('Login failed:', error);
              window.alert('The username or password you’ve entered is incorrect. Please try again.');
            });
          }   
      };

    const handleClickOpenRefund = () => {
        setOpenRefund(true);
        console.log(transactionDetails);
    }

    const handleClickCloseRefund = () => {
        setOpenRefund(false);
        console.log(transactionDetails);
        setUsername(initialUsername); // Reset the username
        setPassword(initialPassword); // Reset the password
    }

    const handleClickOpenReturn= () => {
        setOpenReturn(true);
        console.log(transactionDetails);
    }

    const handleClickCloseReturn = () => {
        setOpenReturn(false);
        console.log(transactionDetails);
        setUsername(initialUsername); // Reset the username
        setPassword(initialPassword); // Reset the password
    }

    // handle open for view
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    // View function
    useEffect(() => {
        axios.get(`http://localhost:8080/transaction/getByTransaction?transactionid=${id}`)
            .then((response) => {
                console.log(response.data);
                const responseData: TransactionDetails = response.data;
                setTransactionDetails(responseData);
                if (id) {
                    axios.get(`http://localhost:8080/transaction/${id}/products`)
                        .then((response) => {
                            console.log('Products response:', response.data);
                            const responseData: Product = response.data;
                        })
                        .catch((error) => {
                            console.error('Error fetching products:', error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    // Product Table for Grid
    const columns: GridColDef[] = [
        { field: 'productid', headerName: 'Product ID', flex: 1 },
        { field: 'productname', headerName: 'Product Name',  flex: 1},
        { field: 'price', headerName: 'Price',  flex: 1 },
        { field: 'quantity', headerName: 'Quantity', flex: 1 },
    ];
    
    const getRowId = (row: Product) => row.productid;

    return (
        <div>
            <button
                className="btn btn-success btn-lg"
                style={{
                    marginRight: 5,
                    fontSize: 15,
                    fontWeight: 'medium'
            }} 
            onClick={handleClickOpen}>View</button>

            <Dialog open={open} onClose={handleClickClose}>
                <DialogContent>
                    <Card sx={{maxWidth: 900, maxHeight: 1000}}>
                        <Typography sx={{fontSize: 15, margin: 'auto', color: 'black', marginLeft: 2}}>Transaction Details</Typography>
                        <CardActions>
                            <TextField
                                type="text"
                                label="Transaction ID"
                                variant="outlined"
                                defaultValue={props_transaction.transactionid}
                                fullWidth
                                InputProps={{readOnly: true}}
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                            />
                            <TextField
                                type="text"
                                label="Date/Time"
                                variant="outlined"
                                fullWidth
                                defaultValue={props_transaction.date_time}
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                InputProps={{readOnly: true}}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                            />
                        </CardActions>

                         <CardActions>
                            <TextField
                                type="number"
                                label="Total Price"
                                variant="outlined"
                                fullWidth
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                defaultValue={props_transaction.total_price}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                            />
                            <TextField
                                type="number"
                                label="Total Quantity"
                                variant="outlined"
                                fullWidth
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                defaultValue={props_transaction.total_quantity}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                            />
                        </CardActions>

                        <CardActions>
                            <TextField
                                type="number"
                                label="Tendered Bill"
                                variant="outlined"
                                fullWidth
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                defaultValue={props_transaction.tendered_bill}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                            />
                            <TextField
                                type="number"
                                label="Balance"
                                variant="outlined"
                                fullWidth
                                defaultValue={props_transaction.balance}
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                            />
                        </CardActions>

                        <CardActions>
                            <TextField
                                type="text"
                                label="Customer Name"
                                variant="outlined"
                                fullWidth
                                defaultValue={props_transaction.customer_name}
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                            />
                        </CardActions>

                        <CardActions>
                            <TextField
                                type="text"
                                label="Customer Email"
                                variant="outlined"
                                fullWidth
                                defaultValue={props_transaction.customer_email}
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                            />
                        </CardActions>

                        <CardActions>
                            <TextField
                                type="number"
                                label="Customer Number"
                                variant="outlined"
                                fullWidth
                                defaultValue={props_transaction.customer_num}
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                                />
                        </CardActions>

                        <div style={{ width: '100%', height: '30vh' }}>
                            <DataGrid
                                sx={{ fontSize: 15 }}
                                rows={products}
                                columns={columns}
                                pageSizeOptions={[5, 10]}
                                getRowId={getRowId}
                            />
                        </div>

                        <DialogActions>
                            <button className="btn btn-success btn-lg"
                                style={{
                                    marginRight: 5,
                                    fontSize: 15,
                                    fontWeight: 'medium'
                                }} autoFocus onClick={handleClickOpenRefund}> Refund
                            </button>
                            <button className="btn btn-success btn-lg"
                                style={{
                                    marginRight: 5,
                                    fontSize: 15,
                                    fontWeight: 'medium'
                                }} autoFocus onClick={handleClickOpenReturn}> Return
                            </button>
                            <button className="btn btn-danger btn-lg"
                                style={{
                                    marginLeft: 5,
                                    fontSize: 15,
                                    fontWeight: 'medium'
                                }} autoFocus onClick={handleClickClose}> Cancel
                            </button>
                        </DialogActions>
                    </Card>
                </DialogContent>
            </Dialog>

            {/* DIALOG FOR REFUND */}
            <Dialog open={openRefund} onClose={handleClickCloseRefund}>
            <DialogContent>
                <Card sx={{maxWidth: 900, borderRadius: 5, backgroundColor: '#f7f5f5', maxHeight: 1000, color: '#213458'}}>
                    <CardContent>
                        <Typography gutterBottom variant='h2' component="div" sx={{fontFamily: "Poppins", fontWeight: 'bold'}} align='center'>
                            Want to Refund Transaction?
                        </Typography>
                        <Card sx={{maxWidth: 500, borderRadius: 5, backgroundColor: '#d3d3db', marginTop: 5, color: '#213458'}}>
                            <Typography gutterBottom variant='h5' component="div" sx={{fontFamily: "Poppins", backgroundColor: '#d3d3db', borderRadius: 2, padding: 1, fontStyle: 'italic', fontWeight: 'medium'}} align='center'>
                                Request for Manager To Approve Refund Request
                            </Typography>
                        </Card>
                    </CardContent>
                        <CardActions sx={{marginTop: 3}}>
                                <TextField
                                    type="text"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    inputProps={{style: {fontSize: 24, fontFamily: 'Poppins', color: '#213458'}}}
                                InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
                                />
                        </CardActions>
                        <CardActions sx={{marginBottom: 5}}>
                                <TextField
                                    type='password'
                                    fullWidth
                                    label="Password"
                                    value={password}
                                    variant='outlined'
                                    onChange={(e) => setPassword(e.target.value)}
                                    inputProps={{style: {fontSize: 24, fontFamily: 'Poppins', color: '#213458'}}}
                                    InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
                                />
                        </CardActions>
                </Card>
            </DialogContent>
            <DialogActions>
                <button className="btn-cancel" onClick={handleClickCloseRefund}>Cancel</button>
                <button className="btn-approve" onClick={handleLoginForRefund}>Approve</button>
            </DialogActions>
            </Dialog>

            {/* DIALOG FOR RETURN */}
            <Dialog open={openReturn} onClose={handleClickCloseReturn}>
            <DialogContent>
                <Card sx={{maxWidth: 900, borderRadius: 5, backgroundColor: '#f7f5f5', maxHeight: 1000, color: '#213458'}}>
                    <CardContent>
                        <Typography gutterBottom variant='h2' component="div" sx={{fontFamily: "Poppins", fontWeight: 'bold'}} align='center'>
                            Want to Return Transaction?
                        </Typography>
                        <Card sx={{maxWidth: 500, borderRadius: 5, backgroundColor: '#d3d3db', marginTop: 5, color: '#213458'}}>
                            <Typography gutterBottom variant='h5' component="div" sx={{fontFamily: "Poppins", backgroundColor: '#d3d3db', borderRadius: 2, padding: 1, fontStyle: 'italic', fontWeight: 'medium'}} align='center'>
                                Request for Manager To Approve Refund Request
                            </Typography>
                        </Card>
                    </CardContent>
                        <CardActions sx={{marginTop: 3}}>
                                <TextField
                                    type="text"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    inputProps={{style: {fontSize: 24, fontFamily: 'Poppins', color: '#213458'}}}
                                InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
                                />
                        </CardActions>
                        <CardActions sx={{marginBottom: 5}}>
                                <TextField
                                    type='password'
                                    fullWidth
                                    label="Password"
                                    value={password}
                                    variant='outlined'
                                    onChange={(e) => setPassword(e.target.value)}
                                    inputProps={{style: {fontSize: 24, fontFamily: 'Poppins', color: '#213458'}}}
                                    InputLabelProps={{ style: { fontSize: 24, fontFamily: 'Poppins' } }}
                                />
                        </CardActions>
                </Card>
            </DialogContent>
            <DialogActions>
                <button className="btn-cancel" onClick={handleClickCloseReturn}>Cancel</button>
                
                <button className="btn-approve" onClick={handleLoginForReturn}>Approve</button>
            </DialogActions>
            </Dialog>
        </div>
    );
};

export default Transaction_Details;
