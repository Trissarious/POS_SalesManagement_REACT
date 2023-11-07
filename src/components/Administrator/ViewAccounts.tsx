import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AccountLoginValid/AuthContext';

interface Account {
  userid: number;
  username: string;
  account_type: string;
}

const ViewAccounts = () => {
  const { isSalesmanLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    // Check for a valid JWT token on page load
    const token = localStorage.getItem('adminToken');

    if (!token) {
      // Redirect to the login page if there's no token
      navigate('/loginadmin');
    } else {
      // Fetch accounts data from your backend service using the provided API endpoint
      fetch('http://localhost:8080/user/getAllUser') // Use your actual API endpoint
        .then(response => response.json())
        .then((data: Account[]) => setAccounts(data))
        .catch(error => console.error('Error fetching accounts', error));
    }
  }, [isSalesmanLoggedIn, navigate]);

  return (
    <div className="confirm-forgot-password">
      <div className="profile-container">
        <h2>Accounts</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.userid}>
                <td>{account.userid}</td>
                <td>{account.username}</td>
                <td>{account.account_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAccounts;
