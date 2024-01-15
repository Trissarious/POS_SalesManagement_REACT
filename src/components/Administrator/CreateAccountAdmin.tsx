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
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import './CSS Files/CreateAccountAdmin.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { ManageAccounts } from '@mui/icons-material';
import ShieldIcon from '@mui/icons-material/Shield';
import { toast } from 'react-toastify';
import { previousDay } from 'date-fns';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


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

const post_account = 'http://localhost:8080/user/postUser';
const Account_Type = [
  {
    value: 'Cashier',
    label: 'Cashier',
  },
  {
    value: 'Sales Manager',
    label: 'Sales Manager',
  },
];

const Gender = [
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Prefer not to say.',
    label: 'Prefer not to say.',
  },
];

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { isAdminLoggedIn, setIsAdminLoggedIn, adminUser } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  // Token
  useEffect(() => {
    const token = localStorage.getItem('adminLoggedIn');
    if (!token) {
      navigate('/loginadmin');
    } else {
      setIsAdminLoggedIn(true);
    // Fetch user data from API
    axios.get('http://localhost:8080/user/getAllUser')
      .then((response) => {
        // Filter users based on business_name
        const filteredUsers = response.data.filter((username: Account) =>
          username.business_name === localStorage.getItem('adminBusinessName')
        );
        setAccounts(filteredUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  }, [isAdminLoggedIn, navigate, adminUser]);

  const themeDilven = createTheme({
    palette: {
      primary: {
        main: '#1D7D81',
      },
    },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [business_name, setBusiness_name] = useState('');
  const [address, setAddress] = useState('');
  const [contactnum, setContactnum] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFormValid, setFormValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  //Function to check if all required fields are all filled
  const isFormComplete = () => {
    return (
         username.trim() !== '' &&
      password.trim() !== '' &&
      selectedAccountType.trim() !== '' &&
      fname.trim() !== '' &&
      lname.trim() !== '' &&
      selectedDate !== null &&
      contactnum.trim() !== '' &&
      address.trim() !== '' &&
      selectedGender.trim() !== '' &&
      email.trim() !== '' &&
      business_name.trim() !== ''
    );
  };

  const handleSubmit = () => {
    if(isFormComplete()) {
      if(selectedDate) {
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      
        axios.post(post_account, {
          username: username,
            password: password,
            account_type: selectedAccountType,
            email: email,
            fname: fname,
            lname: lname,
            business_name: business_name,
            address: address,
            contactnum: contactnum,
            gender: selectedGender,
            bday: formattedDate,
        }).then((res) => {
          toast.success('Account created successfully.', {
            position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
          });
          console.log(res.data);
        }).catch((err) => console.log(err));
          toast.error('Username has already been used. Please try again with a different username.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      } else {
        alert('Please select a birth date');
      }
    } else {
      setFormValid(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const passwordsMatch = password === confirmPassword;

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
              Create an Account
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              justifyContent: 'center',
              color: '#4BB543',
              px: [1],
            }}
          >
            {localStorage.getItem('adminUsername')} {/* Display Username */}
          </Toolbar>
          <Divider />
          <List component="nav">
            <Link to="/#" className='side-nav'>
              <IconButton color="inherit">
                <HomeIcon sx={{fontSize: 27}}/>
              </IconButton>
              <Button>Home</Button>
            </Link>

            <Link to="/adminmainpage" className='side-nav'>
              <IconButton color="inherit">
                <ShieldIcon sx={{fontSize: 27}}/>
              </IconButton>
              <Button>Admin Main</Button>
            </Link>

            <Link to="/createaccountadmin" style={{backgroundColor: '#AFE1AF'}} className='side-nav'>
              <IconButton color="inherit">
                <PersonAddIcon sx={{fontSize: 27}}/>
              </IconButton>
              <Button>Create an Account</Button>
            </Link>

            <Link to="/viewaccounts" className='side-nav'>
              <IconButton color="inherit">
                <ManageAccounts sx={{fontSize: 27}}/>
              </IconButton>
              <Button>View Accounts</Button>
            </Link>

            <Link to="/loginadmin"  className='side-nav'>
              <IconButton color="inherit">
                <LogoutIcon sx={{fontSize: 27}}/>
              </IconButton>
              <Button>Logout</Button>
            </Link>
          </List>
        </Drawer>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Input Details to create account */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', fontSize: 15, fontFamily: 'sans-serif'}}>
                  
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
