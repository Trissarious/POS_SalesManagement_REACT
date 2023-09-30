import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled, tableCellClasses } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, RestProduct } from '../REST/REST Product/RestProduct';
import ProductService from '../REST/REST Product/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RestTransaction } from '../REST/REST Transaction/RestTransaction';
import { toast, ToastContainer } from 'react-toastify';


<title>Cashiering</title>
const get_product = 'http://localhost:8080/product/getAllProduct';
const post_transaction = 'http://localhost:8080/transaction/postTransaction';

export default function Cart() {
    //PRODUCT VARIABLES
    const [deleteByID, getProductByID, editProduct, addProduct, product] = RestProduct();
    const [products, setProduct] = useState([product])
    const [cart, setCart] = useState([product])

    //TRANSACTION VARIABLES
    const [deleteByIDTransaction,getTransactionByid,editTransaction,addTransaction,transaction] = RestTransaction();
    const [transactions, setTransactions] = useState([transaction]);
    const [total_quantity, setTotal_quantity] = useState('');
    const [total_price, setTotal_Price] = useState('');
    const [tendered_bill, setTendered_bill] = useState('');
    const [balance, setBalance] = useState('');
    const [customer_name, setCustomer_name] = useState('');
    const [customer_num, setCustomer_num] = useState('');
    const [customer_email, setCustomer_email] = useState('');
    const [date_time, setDate_time] = useState('');
    const [userid, setUserid] = useState('');
    const [productname, setProductname] = useState('');
     //FETCH PRODUCT TABLE
     useEffect(() => {   
        const fetchData = async () => {
        try {
            const response = await axios.get(get_product); 
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
        };
        fetchData();}, []);

    //RECORD A TRANSACTION
    const record_transaction = async () => {
        axios.post(post_transaction,{
            total_quantity: total_quantity,
            total_price: total_price,
            tendered_bill: tendered_bill,
            balance: balance,
            customer_name: customer_name,
            customer_num: customer_num,
            customer_email: customer_email,
            date_time: date_time,
            userid: userid,
            productname: productname,
        }).then(res => {
            console.log(transaction)
            alert('Success')
            }).catch(err=>console.log(err))
    }

    return (
        <div>
            <h3>Customer Name</h3>
            <TextField
                value={customer_name}
                onChange={(e) => setCustomer_name(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />

            <h3>Customer Number</h3>
            <TextField
                value={customer_num}
                onChange={(e) => setCustomer_num(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />

            <h3>Customer Email</h3>
            <TextField
                value={customer_email}
                onChange={(e) => setCustomer_email(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />

            <h3>Cashier</h3>
            <TextField
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />

            <h3>Date Time</h3>
            <TextField
                value={date_time}
                onChange={(e) => setDate_time(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />
            <h3>total_quantity</h3>
            <TextField
                value={total_quantity}
                onChange={(e) => setTotal_quantity(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />

            <h3>Product</h3>
            <TextField
                value={productname}
                onChange={(e) => setProductname(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />
            <h3>Tendered Bill</h3>
            <TextField
                value={tendered_bill}
                onChange={(e) => setTendered_bill(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />
            <h3>Total amount</h3>
            <TextField
                value={total_price}
                onChange={(e) => setTotal_Price(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />
            <h3>Change</h3>
            <TextField
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                fullWidth
                id="filled-required"
                defaultValue=""
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />

        <button className='btn-lg' onClick={record_transaction}>PAY NOW</button>
        </div>
    )
}