import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Transaction {
    transactionid: number;
    total_quantity: number;
    total_price: number;
    tendered_bill: number;
    balance: number;
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
                    setTransactionDeleted(true); // Set a flag to indicate that the transaction has been deleted
                    setTransactions((prevTransactions) =>
                        prevTransactions.filter((transaction) => transaction.transactionid !== id)
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h1>Transaction History</h1>
            {isTransactionDeleted && (
                <div>
                    <p>Transaction has been deleted.</p>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Total Quantity</th>
                        <th>Total Price</th>
                        <th>Tendered Bill</th>
                        <th>Balance</th>
                        <th>Date & Time</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.transactionid}>
                            <td>{transaction.transactionid}</td>
                            <td>{transaction.total_quantity}</td>
                            <td>{transaction.total_price}</td>
                            <td>{transaction.tendered_bill}</td>
                            <td>{transaction.balance}</td>
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
