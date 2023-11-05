import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './CSS FIles/TransactionDetails.css'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AccountLoginValid/AuthContext';

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
}

const TransactionDetails = () => {
    const { isCashierLoggedIn } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      // Check for a valid JWT token on page load
      const token = localStorage.getItem('cashierToken');
  
      if (!token) {
        // Redirect to the login page if there's no token
        navigate('/logincashier');
      } else {
        // Verify the token on the server, handle token expiration, etc.
        // If token is valid, setIsCashierLoggedIn(true)
      }
    }, [isCashierLoggedIn, navigate]);

    const { id } = useParams();
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch transaction details using the provided URL
        axios.get(`http://localhost:8080/transaction/getByTransaction?transactionid=${id}`)
            .then((response) => {
                const responseData: TransactionDetails = response.data;
                setTransactionDetails(responseData);
            })
            .catch((error) => {
                console.error(error);
            });

        // Fetch products related to this transaction
        axios.get(`http://localhost:8080/transaction/${id}/products`)
            .then((response) => {
                const responseData: Product[] = response.data;
                setProducts(responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleRefundClick = () => {
        const confirmed = window.confirm('Are you sure you want to refund?');
        if (confirmed) {
            axios.delete(`http://localhost:8080/transaction/deleteTransaction/${id}`)
              .then(() => {
                  window.confirm(`Transaction ${id} has been refunded and deleted.`);
                  window.location.href = '/transactionhistory'; 
              })
              .catch((error) => {
                  console.error(error);
                  window.alert(`Failed to refund transaction ${id}.`);
              });
        }
    };
    
    return (
        <div className='table-container'>
            <div className='table'>
            <h2>Transaction Details</h2>
            {transactionDetails && (
                <table>
                    <tbody>
                        <tr>
                            <th>Transaction ID</th>
                            <td style={{fontWeight: 'bold', color: 'green'}}>{transactionDetails.transactionid}</td>
                        </tr>
                        <tr>
                            <th>Total Quantity</th>
                            <td>{transactionDetails.total_quantity}</td>
                        </tr>
                        <tr>
                            <th>Total Price</th>
                            <td>{transactionDetails.total_price.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Tendered Bill</th>
                            <td>{transactionDetails.tendered_bill.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Balance</th>
                            <td>{transactionDetails.balance.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Customer Name</th>
                            <td>{transactionDetails.customer_name}</td>
                        </tr>
                        <tr>
                            <th>Customer Number</th>
                            <td>{transactionDetails.customer_num}</td>
                        </tr>
                        <tr>
                            <th>Customer Email</th>
                            <td>{transactionDetails.customer_email}</td>
                        </tr>
                        <tr>
                            <th>Date & Time</th>
                            <td>{transactionDetails.date_time}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            </div>
            <div className='table'>
            <h2>Products Purchased</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.productid}>
                            <td style={{fontWeight: 'bold', color: 'red'}}>{product.productid}</td>
                            <td>{product.productname}</td>
                            <td>{product.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="buttons-container">
            <button className="refund-button" onClick={handleRefundClick}>
            Refund
          </button>
                    <button className="return-button">Return</button>
                </div>
        </div>
        </div>
    );
};

export default TransactionDetails;
