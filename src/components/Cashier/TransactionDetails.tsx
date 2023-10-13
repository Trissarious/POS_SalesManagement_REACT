import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

    return (
        <div>
            <h2>Transaction Details</h2>
            {transactionDetails && (
                <table>
                    <tbody>
                        <tr>
                            <th>Transaction ID</th>
                            <td>{transactionDetails.transactionid}</td>
                        </tr>
                        <tr>
                            <th>Total Quantity</th>
                            <td>{transactionDetails.total_quantity}</td>
                        </tr>
                        <tr>
                            <th>Total Price</th>
                            <td>{transactionDetails.total_price}</td>
                        </tr>
                        <tr>
                            <th>Tendered Bill</th>
                            <td>{transactionDetails.tendered_bill}</td>
                        </tr>
                        <tr>
                            <th>Balance</th>
                            <td>{transactionDetails.balance}</td>
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
            <h2>Products Purchased</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.productid}>
                            <td>{product.productid}</td>
                            <td>{product.productname}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionDetails;
