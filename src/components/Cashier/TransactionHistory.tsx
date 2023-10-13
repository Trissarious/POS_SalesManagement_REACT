import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TransactionHistory.css';

interface Transaction {
    transactionid: number;
    date_time: string;
}

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isTransactionDeleted, setTransactionDeleted] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/transaction/getAllTransaction')
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDeleteTransaction = (id: number) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
  
      if (confirmDelete) {
          axios.delete(`http://localhost:8080/transaction/deleteTransaction/${id}`)
              .then(() => {
                  // Display a window.confirm message after successful deletion
                  const success = window.confirm("Transaction has been deleted.");
                  if (success) {
                      setTransactions((prevTransactions) =>
                          prevTransactions.filter((transaction) => transaction.transactionid !== id)
                      );
                  }
              })
              .catch((error) => {
                  console.error(error);
              });
      }
  };

    return (
        <div>
            <h1 style={{ marginLeft: '90px' , marginBottom: '10px', marginTop: '30px'}}>All Transactions</h1>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date & Time</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.transactionid}>
                            <td>{transaction.transactionid}</td>
                            <td>{transaction.date_time}</td>
                            <td>
                                <Link to={`/transactions/${transaction.transactionid}`}>
                                    View
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteTransaction(transaction.transactionid)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
