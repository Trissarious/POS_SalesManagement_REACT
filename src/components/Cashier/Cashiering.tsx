import { Button } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RestProduct } from '../REST/REST Product/RestProduct';
import ProductService from '../REST/REST Product/ProductService';

const url = 'http://localhost:8080/product/getAllProduct';

export default function Cashiering() {
    <title>Cashiering</title>
    const [deleteByID, getProductByID, editProduct, addProduct, product, error] = RestProduct();
    const [products, setProduct] = useState([product])

    useEffect(() => {
        axios.get(url).then(res => {
            setProduct(res.data)
        }).catch(err => console.log(err))
    })

 return (
    <div>
        {
        products.map(product => 
            <tr key={product?.productid}>
                <td>{product?.productid}</td>
                <td>{product?.productname}</td>
                <td>{product?.quantity}</td>
                <td>{product?.price}</td>
            </tr>
            )
        }

        <h1>{product?.productname}dsads</h1>
    </div>
 );
}