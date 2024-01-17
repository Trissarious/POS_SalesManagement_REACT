import * as React from 'react';
import { styled, createTheme, ThemeProvider, createMuiTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useAuth } from '../AccountLoginValid/AuthContext';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { ManageAccounts, Visibility, VisibilityOff } from '@mui/icons-material';
import ShieldIcon from '@mui/icons-material/Shield';
import { ToastContainer, toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './CSS FIles/TransactionHistory.css';
import ViewTransactionLink from './ViewTransactionLink';

const drawerWidth: number = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Transaction_Details = () => {
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

    useEffect(() => {
        const token = localStorage.getItem('cashierToken');
    
        if (!token) {
          navigate('/logincashier');
        } else {
        }
      }, [isCashierLoggedIn, navigate]);

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
        if (id) {
            axios.get(`http://localhost:8080/transaction/getByTransaction?transactionid=${id}`)
                .then((response) => {
                    console.log(response.data);
                    const responseData: TransactionDetails = response.data;
                    setTransactionDetails(responseData);
                })
                .catch((error) => {
                    console.error(error);
                });
    
            axios.get(`http://localhost:8080/transaction/${id}/products`)
                .then((response) => {
                    console.log('Products response:', response.data);
                    const responseData: Product[] = response.data;
                    setProducts(responseData);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [id]);
    

    // Product Table for Grid
    const columns: GridColDef[] = [
        { field: 'productid', headerName: 'Product ID', flex: 1 },
        { field: 'productname', headerName: 'Product Name',  flex: 1},
        { field: 'price', headerName: 'Price',  flex: 1 },
        { field: 'quantity', headerName: 'Quantity', flex: 1 },
    ];
    
    const getRowId = (row: Product) => row.productid;

    const themeDilven = createTheme({
        palette: {
          primary: {
            main: '#1D7D81',
          },
        },
      });

    // Logout Function
    const [openLogout, setOpenLogout] = React.useState(false);
    const handleClickOpenLogout = () => { setOpenLogout(true); }
    const handleClickCloseLogout = () => { setOpenLogout(false); }
  
    const handleLogout = () => {
        localStorage.removeItem('cashierToken');
        localStorage.removeItem('cashierLoggedIn')
        localStorage.removeItem('cashierUsername');
        localStorage.removeItem('cashierBusinessName');
        navigate('/logincash');
    }

    return (
           <ThemeProvider theme={themeDilven}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                    pr: '24px',
                    }}
                >
                    <Typography
                    component="h1"
                    variant="h4"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                    >
                    Transaction Details
                    </Typography>

                    <Typography
                    component="h1"
                    variant="h4"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}>
                    <span className='nav-user' style={{ float: 'right', marginRight: 10}}>
                        <IconButton color="inherit">
                        <AccountCircleIcon sx={{fontSize: 30}}/>
                        </IconButton>
                        {localStorage.getItem('cashierUsername')}
                    </span>
                    </Typography>
                </Toolbar>
                </AppBar>
                
                <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
                >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', fontSize: 15, fontFamily: 'sans-serif'}} style={{height: 800}}>
                            <div>
                            <Card sx={{maxWidth: 900, maxHeight: 1000}}>
                        <Typography sx={{fontSize: 15, margin: 'auto', color: 'black', marginLeft: 2}}>Transaction Details</Typography>
                        <CardActions>
                            <TextField
                                type="text"
                                label="Transaction ID"
                                variant="outlined"
                                defaultValue={transactionDetails?.transactionid}
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
                                defaultValue={transactionDetails?.date_time}
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
                                defaultValue={transactionDetails?.total_price}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                            />
                            <TextField
                                type="number"
                                label="Total Quantity"
                                variant="outlined"
                                fullWidth
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                defaultValue={transactionDetails?.total_quantity}
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
                                defaultValue={transactionDetails?.tendered_bill}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                            />
                            <TextField
                                type="number"
                                label="Balance"
                                variant="outlined"
                                fullWidth
                                defaultValue={transactionDetails?.balance}
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
                                defaultValue={transactionDetails?.customer_name}
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
                                defaultValue={transactionDetails?.customer_email}
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
                                defaultValue={transactionDetails?.customer_num}
                                inputProps={{style: {fontSize: 16, fontFamily: 'Poppins', color: '#213458'}}}
                                InputLabelProps={{ style: { fontSize: 16, fontFamily: 'Poppins' } }}
                                InputProps={{readOnly: true}}
                                />
                        </CardActions>
                    </Card>
                            </div>
                            <div style={{ height: 700, width: '50%' }}>
                            <DataGrid
                                sx={{ fontSize: 15 }}
                                rows={products}
                                columns={columns}
                                pageSizeOptions={[5, 10]}
                                getRowId={getRowId}
                            />
                            </div>
                        </Paper>
                    </Grid>
                    </Grid>
                </Container>
                </Box>
            </Box>
            <ToastContainer className="foo" style={{ width: "600px", fontSize: 15 }} />
            </ThemeProvider>
    );
};

export default Transaction_Details;
