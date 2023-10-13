import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
    productid: number;
    productname: string;
    quantity: number;
    price: number;
}

const TransactionDetails = () => {
    const { id } = useParams();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/transaction/${id}/products`)
            .then((response) => {
                const responseData: Product[] = response.data; // Assumes the response is an array of Product

                // Set product details
                setProducts(responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    return (
        <div>
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
