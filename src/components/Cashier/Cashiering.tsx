
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled, tableCellClasses } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, RestProduct } from '../REST/REST Product/RestProduct';
import ProductService from '../REST/REST Product/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { channel } from 'diagnostics_channel';

const initialSelectedProducts: any[] | (() => any[]) = [];
const url = 'http://localhost:8080/product/getAllProduct';
const post_transaction = 'http://localhost:8080/transaction/postTransaction';

export default function Cart() {
    <title>Cashiering</title>
    const [deleteByID, getProductByID, editProduct, addProduct, product] = RestProduct();
    const [products, setProduct] = useState([product])
    const [cart, setCart] = useState([product]);
    const [total_amount, setTotal_Amount] = useState(0);
    const [productname, setProductname] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [selectedProducts, setSelectedProducts] = useState(initialSelectedProducts);
    //TRANSACTION VARIABLES
    const [total_quantity, setTotal_quantity] = useState(0);
    const [total_price, setTotal_Price] = useState('');
    const [tendered_bill, setTendered_bill] = useState('');
    const [balance, setBalance] = useState('');
    const [customer_name, setCustomer_name] = useState('');
    const [customer_num, setCustomer_num] = useState('');
    const [customer_email, setCustomer_email] = useState('');
    const [date_time, setDate_time] = useState('');

    //Fetch Product Table from Database
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

        const record_transaction = async () => {
          axios.post(post_transaction, {
            total_quantity: total_quantity,
            total_price: total_price,
            tendered_bill: tendered_bill,
            balance: balance,
            customer_name: customer_name,
            customer_num: customer_num,
            customer_email: customer_email,
            date_time: date_time,
            product: selectedProducts.map((productid) => ({ productid: productid }))
          })
            .then(res => {
              console.log(res.data);
              alert('Transaction Complete');
            })
            .catch(err => console.log(err));
        }

    // Styling the Product Table
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

    // Function to add a selected product ID to the state
    const addProductToSelection = (productid: any) => {
        // Check if the productid is not already in selectedProducts
        if (!selectedProducts.includes(productid)) {
            // If it's not selected, select it
            setSelectedProducts([...selectedProducts, productid]);
        }};

    // Add to cart table
    const addProductToCart = async(product: Product) => {
       const productExist = cart.find((item) => item?.productid === product?.productid)
        if(productExist) {
            setCart(cart.map((item) => item?.productid === product?.productid ?
            {...productExist, quantity: productExist.quantity + 1, total_amount: productExist.price * productExist.quantity}: item));
        } else {
            setCart([...cart, {...product, quantity: 1}]);
       }};

    // Removes the item from the cart
    const removeProduct = async(product:Product) =>{
        const newCart =cart.filter(cart => cart?.productid !== product.productid);
        setCart(newCart);
        setSelectedProducts(selectedProducts.filter((id) => id !== product.productid));
    }

    const decreaseQuantity = async (product: Product) => {
        const productExist = cart.find((item) => item?.productid === product?.productid);
        if (productExist) {
          // If the product quantity is greater than 1, decrease it by 1
          if (productExist.quantity > 1) {
            setCart(
              cart.map((item) =>
                item?.productid === product?.productid
                  ? {
                      ...productExist,
                      quantity: productExist.quantity - 1,
                      total_amount: productExist.price * (productExist.quantity - 1),
                    }
                  : item
              )
            );
          } else {
            // If the product quantity is 1, remove the product from the cart
            setCart(cart.filter((item) => item?.productid !== product?.productid));
          }
        }
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
                fullWidth
                value={customer_name}
                onChange={(e) => setCustomer_name(e.target.value)}
                id="filled-required"
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15}}}
            />
            <h3>Customer Number</h3>
            <TextField
                fullWidth
                value={customer_num}
                onChange={(e) => setCustomer_num(e.target.value)}
                id="filled-required"
                size='small'
                variant="filled"
                inputProps={{style: {fontSize: 15}}}
            />
            <h3>Customer Email</h3>
            <TextField
                value={customer_email}
                onChange={(e) => setCustomer_email(e.target.value)}
                id="filled-required"
                fullWidth
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
        <h3>Date TIME</h3>
        <TextField
                required
                id="filled-required"
                label=""
                fullWidth
                value={date_time}
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
                    <StyledTableCell align="right"> 
                    <label className="button-label">ADD
                         <input
                             type="checkbox"
                             id='checkbox'
                             onChange={() => addProductToSelection(product?.productid)}
                             onClick={() => {
                              if (product) {
                              addProductToCart(product);
                              }
                          }}
                             checked={selectedProducts.includes(product?.productid)}
                             style={{ display: 'none' }}
                         ></input>
                     </label>
                   
                    </StyledTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>

         {/* Display Cashiering */}
         <div className="col-lg-4">
            <div className='cashiering'>
                    <Table className='table table-responsive table-dark table-hover'>
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Product Name</StyledTableCell>
                            <StyledTableCell align="right">Total Quantity</StyledTableCell>
                            <StyledTableCell align="right">Total Price</StyledTableCell>
                            <StyledTableCell align="right">Actions </StyledTableCell>
                            <StyledTableCell align="right"> </StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((item) => (
                                <TableRow key={item?.productid}>
                                <StyledTableCell component="th" scope="row">
                                    {item?.productid}
                                </StyledTableCell>
                                <StyledTableCell align="right">{item?.productname}</StyledTableCell>
                                <StyledTableCell align="right">{item?.quantity}</StyledTableCell>
                                <StyledTableCell align="right">₱ </StyledTableCell>
                                <StyledTableCell align='right'>
                                      <button className='btn btn-success' onClick={() => {
                                        if(item) {
                                            decreaseQuantity(item)
                                        }}}>-</button>
                                      <button className='btn btn-success' onClick={() => {
                                        if (item) {
                                        addProductToCart(item);
                                        }
                                    }}>+</button>
                                </StyledTableCell>
                                <StyledTableCell align="right"> 
                                <button className='btn btn-danger btn-lg' 
                                    onClick={() => {
                                        if (item) {
                                            removeProduct(item)
                                        }
                                   }}>Remove</button>
                                </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <hr></hr>                
                    <div>
                        <h1>Total Amount: ₱{total_amount}</h1>
                        <h3>Total Amount:
                            <TextField
                                value={total_price}
                                onChange={(e) => setTotal_Price(e.target.value)}
                                required
                                id="filled-required"
                                fullWidth
                                size='small'
                                variant="filled"
                                inputProps={{style: {fontSize: 15}}}
                            /> </h3>   

                        <h3>Tender
                            <TextField
                                value={tendered_bill}
                                onChange={(e) => setTendered_bill(e.target.value)}
                                required
                                id="filled-required"
                                fullWidth
                                size='small'
                                variant="filled"
                                inputProps={{style: {fontSize: 15}}}
                            /> </h3>
                           
                        <h3>Change 
                            <TextField
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    required
                                    id="filled-required"
                                    fullWidth
                                    size='small'
                                    variant="filled"
                                    inputProps={{style: {fontSize: 15}}}
                                />
                        </h3>

                        <button className='btn-lg' onClick={record_transaction}>PAY NOW</button>     
                            
                    </div>
            </div>
        </div>          
        </div>
    </div>
    </div>
 );
}