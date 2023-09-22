import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled, tableCellClasses } from '@mui/material';
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
        {/* Customer Details */}
        <div className="col-lg-8">
            <div className='customer-details'> 
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
            <hr></hr>
        </div>
        </div>

        {/* Display user cashier */}
        <div className="col-lg-4">
        <div className='cashier-details'>
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
        </div>
        </div>
        {/* DISPLAYS PRODUCT TABLE */}
        <div className='container'> 
        <div className="col-lg-8">
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                    <StyledTableCell align="right"><Button>Add</Button></StyledTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>

         {/* Display Cashiering */}
         <div className="col-lg-4">
            <div className='cashiering'>
                    
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
        </div>          

        </div>
    </div>
    </div>
 );
}