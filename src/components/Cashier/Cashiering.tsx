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

export default function GetProducts() {
    //PRODUCT VARIABLES
    const [deleteByID, getProductByID, editProduct, addProduct, product] = RestProduct();
    const [products, setProduct] = useState([product])
    const [cart, setCart] = useState([product])
    const [totalAmount, setTotalAmount] = useState(0);

    //TRANSACTION VARIABLES
    const [total_quantity, setTotal_quantity] = useState('');
    const [total_price, setTotal_Price] = useState('');
    const [tendered_bill, setTendered_bill] = useState('');
    const [balance, setBalance] = useState('');
    const [customer_name, setCustomer_name] = useState('');
    const [customer_num, setCustomer_num] = useState('');
    const [customer_email, setCustomer_email] = useState('');
    const [date_time, setDate_time] = useState('');
    const [productid, setProductid] = useState('');
    const [userid, setUserid] = useState('');


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
            product: {
                productid: productid
            }
            // account:{
            //     userid:userid
            //     }
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

    //ADD TO CART
    const addProductToCart = async(product: Product) => {
        const productExist = cart.find((item) => item?.productid === product?.productid)
        if(productExist) {
         setCart(cart.map((item) => item?.productid === product?.productid ?
         {...productExist, quantity: productExist.quantity + 1}: item));
        } else {
         setCart([...cart, {...product, quantity: 1}]);
        }
 
     };


    //REMOVE BUTTON 
    const removeProduct = async(product:Product) =>{
        const newCart = cart.filter(cart => cart?.productid !== product.productid);
        setCart(newCart);
      }

      

 return (
    <div className='cashiering-body'>
    <div className="container">
        <div className="row content">
        {/* Customer Details */}
        <div className="col-lg-8">
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
            <hr></hr>
        </div>
        </div>

        {/* Display user cashier
        <div className="col-lg-4">
        <div className='cashier-details'>
        <h3>Cashier</h3>
        <TextField
                required
                value={productid}
                onChange={(e) => setProductid(e.target.value)}
                id="filled-required"
                label=""
                fullWidth
                defaultValue=""
                size='small'
                variant="filled"
                inputProps={{style: {fontSize: 15}}}
            />
        </div>
        </div> */}


    <select onChange={(e) => setProductid(e.target.value)}>
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product?.productid} value={product?.productid}>
              {product?.productname}
            </option>
          ))}
        </select>


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
                    <button className='btn btn-success btn-lg'onClick={() => {
                            if (product) {
                            addProductToCart(product);
                            }
                        }}>Add to Cart</button>
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
                <h1 className='center-cart-h1'>Cart Items</h1>
                    <Table className='table table-responsive table-dark table-hover'>
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Product Name</StyledTableCell>
                            <StyledTableCell align="right">Quantity</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="center">Actions </StyledTableCell>
                            <StyledTableCell align="left"> </StyledTableCell>
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
                                <StyledTableCell align="right">₱{item?.price}</StyledTableCell>
                                <StyledTableCell align="right"> 
                                    <button className='btn btn-success' onClick={() => {
                                        if (item) {
                                        addProductToCart(item);
                                        }
                                    }}>+</button>
                                </StyledTableCell>
                                <StyledTableCell align="right"> <button className='btn btn-danger btn-lg' onClick={() => {
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
                        <h1>Total Amount<TextField
                                required
                                value={total_price}
                                onChange={(e) => setTotal_Price(e.target.value)}
                                id="filled-required"
                                fullWidth
                                defaultValue={product?.price}
                                size='small'
                                variant="filled"
                                inputProps={{
                                    style: {fontSize: 20}}}
                            /></h1>
                        
                        <h3>Total Quantity
                            <TextField
                                required
                                value={total_quantity}
                                onChange={(e) => setTotal_quantity(e.target.value)}
                                id="filled-required"
                                fullWidth
                                type='number'
                                size='small'
                                variant="filled"
                                inputProps={{
                                    readOnly: true,
                                    style: {fontSize: 15}}}
                            /> </h3>

                        <h3>Tender
                            <TextField
                                required
                                value={tendered_bill}
                                onChange={(e) => setTendered_bill(e.target.value)}
                                id="filled-required"
                                fullWidth
                                type='number'
                                size='small'
                                variant="filled"
                                inputProps={{style: {fontSize: 15}}}
                            /> </h3>
                           
                        <h3>Change 
                            <TextField
                                    required
                                    id="filled-required"
                                    fullWidth
                                    type='number'
                                    size='small'
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    variant="filled"
                                    inputProps={{readOnly: true ,style: {fontSize: 15}}}
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