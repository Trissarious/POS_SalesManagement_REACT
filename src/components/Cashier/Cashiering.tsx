import { Button, TextField } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RestProduct } from '../REST/REST Product/RestProduct';
import ProductService from '../REST/REST Product/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    <div className='cashiering-body'>
    <div className="container-fluid">
        <div className="row content">

        {/* Customer Details */}
        <div className="col-sm-8">
            <h3>Customer Name</h3>
            <TextField
                required
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />
            <h3>Customer Number</h3>
            <TextField
                required
                fullWidth
                id="filled-required"
                size='small'
                defaultValue=""
                variant="filled"
                inputProps={{style: {fontSize: 15}}}
            />
            <h3>Customer Email</h3>
            <TextField
                required
                id="filled-required"
                fullWidth
                defaultValue=""
                size='small'
                variant="filled"
                inputProps={{style: {fontSize: 15}}}
            />
        </div>

        {/* Display user cashier */}
        <div className="col-sm-4">
        <h3>Cashier Details</h3>
        <TextField
                required
                id="filled-required"
                label=""
                fullWidth
                defaultValue=""
                size='small'
                variant="filled"
                inputProps={{style: {fontSize: 15}}}
            />
        </div>

        {/* DISPLAYS PRODUCT TABLE */}
        <div className="col-sm-9">
            <table>
                <thead>
                    <tr>
                        <th><h1>ID</h1></th>
                        <th><h1>Product Name</h1></th>
                        <th><h1>Quantity</h1></th>
                        <th><h1>Price</h1></th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>
        </div>
    </div>
    </div>
 );
}