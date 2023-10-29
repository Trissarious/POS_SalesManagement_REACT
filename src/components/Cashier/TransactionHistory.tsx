import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CSS FIles/TransactionHistory.css';
import './CSS FIles//Images Cashierieng/ViewIcon.png'

interface Transaction {
    transactionid: number;
    date_time: string;
    refunded: boolean;
    returned: boolean;
}

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/transaction/getAllTransaction')
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    const [searchInput, setSearchInput] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const handleSearch = (searchValue: string) => {
        setSearchInput(searchValue);
        const filtered = transactions.filter((transaction) =>
            String(transaction.transactionid).includes(searchValue)
        );
        setFilteredTransactions(filtered);
    };

    return (
        <div className="transaction-container">
            <div style={{ display: 'flex', color: '#213458', marginBottom: 50}}>
                <h1 style={{fontSize: 30,marginLeft: '50px', marginBottom: '10px', marginTop: '30px', fontWeight: 'bolder' }}>All Transactions</h1>
                <input
                    type="text"
                    placeholder="Search Transaction ID"
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ 
                        marginLeft: '1000px', 
                        marginTop: '20px',
                        marginRight: '20px',
                        height: '40px',
                        padding: '10px',
                        fontSize: '16px',
                        fontWeight: 'bolder'
                    }}
                />
            </div>
            
            <div className="transaction-table-container">      
            {searchInput && filteredTransactions.length === 0 ? (
                <p style={{ marginTop: '100px', textAlign: 'center', fontSize: '30px' }}>No Transactions found.</p>
            ) : (
                <table className="transaction-table" style={{maxWidth: '90%'}}>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th style={{maxWidth:200}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchInput
                            ? filteredTransactions.map((transaction) => (
                            <tr key={transaction.transactionid}>
                                <td style={{fontWeight: 50}}>Transaction {transaction.transactionid}</td>
                                <td>
                                    <Link
                                        className="btn btn-success btn-lg"
                                        style={{
                                            marginRight: 5,
                                            padding: '10px 40px', 
                                            fontSize: 20,
                                            fontWeight: 'medium'
                                        }}
                                        to={`/transactions/${transaction.transactionid}`}
                                        >
                                        View
                                    </Link>
                                </td>

                            </tr>
                            ))
                            : transactions.map((transaction) => (
                            <tr key={transaction.transactionid}>
                                <td style={{color: '#213458'}}>
                                    <div style={{fontWeight: 'bold', fontSize: 30}}> Transaction {transaction.transactionid}</div> 
                                    <div style={{fontSize: 20}}>{transaction.date_time}</div>
                                    <div style={{fontSize: 20, color: "red", fontStyle: 'italic'}}>{transaction.refunded ? 'Refunded' : ''}</div>
                                    <div style={{fontSize: 20, color: "red", fontStyle: 'italic'}}>{transaction.returned ? 'Returned' : ''}</div>
                                </td>
                                <td>
                                <Link
                                    className="btn btn-success btn-lg"
                                    style={{
                                        marginRight: 5,
                                        padding: '10px 40px', 
                                        fontSize: 20,
                                        fontWeight: 'medium'
                                    }}
                                    to={`/transactions/${transaction.transactionid}`}
                                    >
                                    View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
       </div> 
    );
};

export default TransactionHistory;
