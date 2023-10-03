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
const initialSelectedProducts: any[] | (() => any[]) = [];
const get_product = 'http://localhost:8080/product/getAllProduct';
const post_transaction = 'http://localhost:8080/transaction/postTransaction';

export default function GetProducts() {
    //PRODUCT VARIABLES
    const [deleteByID, getProductByID, editProduct, addProduct, product] = RestProduct();
    const [products, setProduct] = useState([product])
    const [selectedProducts, setSelectedProducts] = useState(initialSelectedProducts);

    //TRANSACTION VARIABLES
    const [total_quantity, setTotal_quantity] = useState('');
    const [total_price, setTotal_Price] = useState('');
    const [tendered_bill, setTendered_bill] = useState('');
    const [balance, setBalance] = useState('');
    const [customer_name, setCustomer_name] = useState('');
    const [customer_num, setCustomer_num] = useState('');
    const [customer_email, setCustomer_email] = useState('');
    const [date_time, setDate_time] = useState('');

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

    // Function to add a selected productid to the state
    const addProductToSelection = (productid: any) => {
        setSelectedProducts([...selectedProducts, productid]);
    };

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
            product: selectedProducts.map((productid) => ({ productid: productid }))
        }).then(res => {
            console.log(res.data)
            alert('Transaction Complete')
            }).catch(err=>console.log(err))
    }  


    // STYLING THE PRODUCT TABLE 
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          fontSize: 15,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 15,
        },
      }));

      
 return (
    <div className='cashiering-body'>
        <div className="container">
            <div className="row content">
            <div className="col-lg-7">
    {/* DISPLAYS PRODUCT TABLE */}
    <div className='container'> 
            <TableContainer component={Paper} sx={{maxHeight: 600}}>
                <Table sx={{maxWidth: 700}} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Product ID</StyledTableCell>
                        <StyledTableCell align="right">Product Name</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right"> Actions </StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((product) => (
                        <TableRow key={product?.productid}>
                        <StyledTableCell component="th" scope="row">
                            {product?.productid}
                        </StyledTableCell>
                        <StyledTableCell align="right">{product?.productname}</StyledTableCell>
                        <StyledTableCell align="right">{product?.quantity}</StyledTableCell>
                        <StyledTableCell align="right">₱{product?.price}</StyledTableCell>
                        <StyledTableCell align='right'>
                                <label>
                                    <input
                                    type="checkbox"
                                    onChange={() => addProductToSelection(product?.productid)}
                                    checked={selectedProducts.includes(product?.productid)}
                                    />
                                </label>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <button className='btn-lg' onClick={record_transaction}>PAY NOW</button>             
    </div>
            {/* Customer Details */}
            <div className="col-lg-4">
                <div className='customer-details'> 
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
                            size='small'
                            defaultValue=""
                            variant="filled"
                            inputProps={{style: {fontSize: 15}}}
                        />
                    <h3>Customer Email</h3>
                        <TextField
                            value={customer_email}
                            onChange={(e) => setCustomer_email(e.target.value)}
                            id="filled-required"
                            fullWidth
                            defaultValue=""
                            size='small'
                            variant="filled"
                            inputProps={{style: {fontSize: 15}}}
                        />

                    <h3>Total Amount</h3>
                        <TextField
                            value={total_price}
                            onChange={(e) => setTotal_Price(e.target.value)}
                            id="filled-required"
                            fullWidth
                            defaultValue=""
                            size='small'
                            variant="filled"
                            inputProps={{style: {fontSize: 15}}}
                        />
                    <h3>Total Quantity</h3>
                        <TextField
                             required
                             value={total_quantity}
                             onChange={(e) => setTotal_quantity(e.target.value)}
                            id="filled-required"
                            fullWidth
                            defaultValue=""
                            size='small'
                            variant="filled"
                            inputProps={{style: {fontSize: 15}}}
                        />
                    <h3>Tender</h3>
                        <TextField
                            required
                            value={tendered_bill}
                            onChange={(e) => setTendered_bill(e.target.value)}
                            id="filled-required"
                            fullWidth
                            defaultValue=""
                            size='small'
                            variant="filled"
                            inputProps={{style: {fontSize: 15}}}
                        />
                    <h3>Change</h3>
                        <TextField
                            required
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            id="filled-required"
                            fullWidth
                            defaultValue=""
                            size='small'
                            variant="filled"
                            inputProps={{style: {fontSize: 15}}}
                        />
                </div>
            </div>

    
    </div>
    </div>     
    </div>
 );
}