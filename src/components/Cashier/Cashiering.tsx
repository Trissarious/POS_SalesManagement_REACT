import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled, tableCellClasses } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RestProduct } from '../REST/REST Product/RestProduct';
import ProductService from '../REST/REST Product/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface Product {
    productid: number
    productname: string
    quantity: number
    price: number
  }
const url = 'http://localhost:8080/product/getAllProduct';

export default function Cashiering() {
    <title>Cashiering</title>
    const [deleteByID, getProductByID, editProduct, addProduct, product, error] = RestProduct();
    const [products, setProduct] = useState([product])
    const [cart, setCart] = useState([product])
    const [productname, setProductname] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    //FETCH PRODUCT TABLE
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(url); 
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
        };
        fetchData();}, []);

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

      //ADD TO CART
      const addProductToCart = async(product: any) => {
       console.log(product);
       setCart([...cart, product]);
    };
 
     
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
        <TableContainer component={Paper} sx={{maxHeight: 550}}>
            <Table sx={{ minWidth: 700}} aria-label="customized table">
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
                    <StyledTableCell align="right"> <button className='btn btn-success btn-lg' onClick={() => addProductToCart(product)}>Add to Cart</button></StyledTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>

         {/* Display Cashiering */}
         <div className="col-lg-4">
            <div className='cashiering'>
                <button>Go to Cart ({cart.length})</button>
                    <Table sx={{}} aria-label="customized table">
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
                            <TableRow>
                            <StyledTableCell component="th" scope="row">
                            </StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"> <button className='btn btn-danger btn-lg' >Remove</button></StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
            </div>
        </div>          
        </div>
    </div>
    </div>
 );
}