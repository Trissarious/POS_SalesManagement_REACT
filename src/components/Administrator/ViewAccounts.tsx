import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AccountLoginValid/AuthContext';
import './CSS Files/ViewAccounts.css'
import axios from "axios";
import UpdateAccount from "./UpdateAccount";


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

export default function ViewAccounts() {
    const { isAdminLoggedIn, setIsAdminLoggedIn, adminUser } = useAuth();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const navigate = useNavigate();



    const [searchInput, setSearchInput] = useState('');
    const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);

    const handleSearch = (searchValue: string) => {
        setSearchInput(searchValue);
        const filtered = accounts.filter((account) =>
            String(account.username).includes(searchValue)
        );
        setFilteredAccounts(filtered);
    };

    // Fetch Account data
    useEffect(() => {
        axios.get('https://dilven-pos-sales-management-database-2.onrender.com/user/getAllUser')
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    
    // Token
  useEffect(() => {
    // Check for a valid JWT token on page load
    const token = localStorage.getItem('adminToken');

    if (!token) {
      // Redirect to the login page if there's no token
      navigate('/loginadmin');
    } else {
      setIsAdminLoggedIn(true)

      // Fetch user data from API
      axios.get('https://dilven-pos-sales-management-database-2.onrender.com/user/getAllUser').then((response) => {
        const userData = response.data;
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [isAdminLoggedIn, navigate]);



  return (
    <div className="confirm-forgot-password">
      <div className="profile-container">
        <div className="profile-picture">
          <img src="/path-to-your-image" alt="Profile" />
        </div>

        <div className="profile-name">
        </div>

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
                                    <UpdateAccount
                                      userid={account.userid}
                                      username={account.username}
                                      password={account.password}
                                      account_type={account.account_type}
                                      email={account.email}
                                      business_name={account.business_name}
                                      address={account.address}
                                      fname={account.fname}
                                      lname={account.lname}
                                      contactnum={account.contactnum}
                                      gender={account.gender}
                                      bday={account.bday}
                                      />
                                </td>

                            </tr>
                            ))
                            : accounts.map((account) => (
                            <tr key={account.userid}>
                                <td style={{color: '#213458', textAlign: 'left'}}>
                                <div style={{fontWeight: 'bold', fontSize: 30}}>{account.username}</div> 
                                    <div style={{marginLeft: '10px'}}>
                                      <div style={{fontSize: 20, fontWeight: 'medium', textAlign: 'right', marginTop: '-35px', marginRight: '10px'}}>{account.business_name}</div>
                                      <div style={{fontSize: 20, fontWeight: 'medium', textAlign: 'right', marginRight: '10px', marginBottom: '-30px'}}>{account.contactnum}</div>
                                      <div style={{fontSize: 20, fontStyle: 'italic'}}>{account.fname} {account.lname}</div>
                                      <div style={{fontSize: 20, fontStyle: 'italic'}}>{account.email}</div>
                                      <div style={{fontSize: 20, fontStyle: 'italic'}}>Birth Date: {account.bday}</div>
                                    </div>
                                </td>
                                <td>
                                    <UpdateAccount
                                          userid={account.userid}
                                          username={account.username}
                                          password={account.password}
                                          account_type={account.account_type}
                                          email={account.email}
                                          business_name={account.business_name}
                                          address={account.address}
                                          fname={account.fname}
                                          lname={account.lname}
                                          contactnum={account.contactnum}
                                          gender={account.gender}
                                          bday={account.bday}
                                        />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
       </div> 


      
      </div>
  );
}
