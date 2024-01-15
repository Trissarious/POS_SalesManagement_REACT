import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AccountLoginValid/AuthContext';
import './CSS Files/ViewAccounts.css'
import axios from "axios";
import UpdateAccount from "./UpdateAccount";
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (searchValue: string) => {
    setSearchInput(searchValue);
    const filtered = accounts.filter((account) =>
      String(account.username).includes(searchValue)
    );
    setFilteredAccounts(filtered);
  };

    // Fetch Account data
    useEffect(() => {
        axios.get('http://localhost:8080/user/getAllUser')
            .then((response) => {
                setAccounts(response.data);
                console.log("response:", response.data)
              })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    
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

  return (
    <div className="confirm-forgot-password">
      <div className="profile-container">
        <div className="profile-name">
          {localStorage.getItem('adminUsername')}
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
