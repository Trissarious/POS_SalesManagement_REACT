
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled, tableCellClasses } from '@mui/material';
import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import axios from 'axios';
import { Product, RestProduct } from '../REST/REST Product/RestProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';

const initialSelectedProducts = [];
const url = 'http://localhost:8080/product/getAllProduct';
const post_transaction = 'http://localhost:8080/transaction/postTransaction';

export default function Cashiering()  {
    <title>Cashiering</title>
    const [deleteByID, getProductByID, editProduct, addProduct, product] = RestProduct();
    const [products, setProduct] = useState([product])
    const [cart, setCart] = useState([product])
    const [selectedProducts, setSelectedProducts] = useState(initialSelectedProducts);

    //TRANSACTION VARIABLES
    const [total_quantity, setTotal_quantity] = useState(0);
    const [tendered_bill, setTendered_bill] = useState('');
    const [balance, setBalance] = useState(0);
    const [total_price, setTotal_Price] = useState(0);
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
              handlePrint()
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
    const addProductToSelection = (productid) => {
        // Check if the productid is not already in selectedProducts
        if (!selectedProducts.includes(productid)) {
            // If it's not selected, select it
            setSelectedProducts([...selectedProducts, productid]);
        }};

    // Add to cart table
    const addProductToCart = async (product) => {
        const productExist = cart.find((item) => item?.productid === product?.productid);
      
        if (productExist) {
          const updatedProduct = {
            ...productExist,
            quantity: productExist.quantity + 1,
            subtotal: (productExist.quantity + 1) * productExist.price, // Calculate subtotal
          };
          setCart(cart.map((item) => (item?.productid === product?.productid ? updatedProduct : item)));
        } else {
          const newProduct = {
            ...product,
            quantity: 1,
            subtotal: product.price, // Calculate subtotal for the initial quantity
          };
          setCart([...cart, newProduct]);
        }
      };
      
    // Removes the item from the cart
    const removeProduct = async(product) =>{
        const newCart =cart.filter(cart => cart?.productid !== product.productid);
        setCart(newCart);
        setSelectedProducts(selectedProducts.filter((id) => id !== product.productid));
    }

    const decreaseQuantity = async (product) => {
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
                      total_amount: productExist.price * (productExist.quantity - 1), }: item));
          } else {
            // If the product quantity is 1, remove the product from the cart
            setCart(cart.filter((item) => item?.productid !== product?.productid));
          }
        }
      };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const item of cart) {
          const quantity = parseFloat(item?.quantity);
          const price = parseFloat(item?.price);
          if (!isNaN(quantity) && !isNaN(price)) {totalPrice += quantity * price;}}
        return totalPrice;
    }; useEffect(() => {
        const total_price = calculateTotalPrice();
        setTotal_Price(total_price);
    }, [cart]);  

    const calculateChange = () => {
        const totalPrice = (total_price);
        const tenderedBill = parseFloat(tendered_bill);
        // Check if both values are valid numbers
        if (!isNaN(totalPrice) && !isNaN(tenderedBill)) {
            return tenderedBill - totalPrice;
        }
        // Return 0 if any of the values is not a valid number
        return 0;}; useEffect(() => {
        const balance = calculateChange();
        setBalance(balance);}); 

    // Function to calculate the total quantity
    const calculateTotalQuantity = () => {
        let total_quantity = 0;
        for (const item of cart) {
        if (item?.quantity) {
            total_quantity += item.quantity;
        }}
        return total_quantity;
    }; useEffect(() => { const total_quantity = calculateTotalQuantity(); setTotal_quantity(total_quantity);}); 

     // Function to get the current date and time in the current time zone
    const getCurrentDateTime = () => {
    const now = new Date();
    // Format the date and time as desired
    const formattedDateTime = now.toLocaleString(); // You can customize the format using options
    return formattedDateTime;
  };

  // Update the date_time value with the current date and time at regular intervals
     useEffect(() => {
        const updateDateTime = () => {
        const currentDateTime = getCurrentDateTime();
        setDate_time(currentDateTime);
    };

    // Update the date_time initially
    updateDateTime();
    // Set up an interval to update the date_time every second (or as desired)
    const intervalId = setInterval(updateDateTime, 1000); // Update every 1 second

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  }

   //SEARCH BAR FILTERING
    const [searchQuery, setSearchQuery] = useState('');
    const filteredProducts = products.filter((product) =>
        product?.productname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
 return (
    <div className="container">
                {/*Search Bar */}
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%', 
                        height: '40px', 
                        margin: '10px 0', 
                        padding: '5px', 
                        fontSize: '16px', 
                    }}                    
                />        
        {/* DISPLAYS PRODUCT TABLE */}
        <div className='container-product'> 
        <div className="col-lg-7">
        {filteredProducts.length > 0 ? (   
        <TableContainer component={Paper} sx={{maxHeight: 800}}>
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
                {filteredProducts.map((product) => (
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
            ) : (
            <div className="no-products-found" style={{ 
            background: 'white', 
            padding: '100px', /* Increase the padding to expand the background */
            margin: '1px', /* Add margins for spacing */
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            }}>
            No products found
            </div>
            )}
            <hr></hr>
        </div>

         {/* Display Cashiering */}
         <div className="col-lg-5">
            <TableContainer component={Paper} sx={{maxHeight: 400 }}>
            <div style={{display: "none"}}>
                    <ComponentToPrint
                        ref={componentRef}
                        cart={cart}
                        customer_name={customer_name}
                        customer_num={customer_num}
                        customer_email={customer_email}
                        date_time={date_time}
                        total_price={total_price}
                        total_quantity={total_quantity}
                        balan={balance}
                    />
                    </div>
                    <Table className='table table-responsive table-dark table-hover' sx={{ minWidth: 300}}>
                    
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Product Name</StyledTableCell>
                            <StyledTableCell align="right">Quantity</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right">Total Price</StyledTableCell>
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
                                <StyledTableCell align="right">₱{item?.subtotal}</StyledTableCell>
                                <StyledTableCell align='right'>
                                      <button className='btn btn-success' onClick={() => {
                                        if(item) {
                                            decreaseQuantity(item)
                                        }}}> - </button>
                                      <button className='btn btn-success' onClick={() => {
                                        if (item) {
                                        addProductToCart(item);
                                        }
                                    }}> + </button>
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
                    </TableContainer>
            </div>          
        </div>
        <div className="row content">
        {/* Customer Details */}
        <div className="col-lg-7">
            <div className='customer-details'> 
            <h3>Customer Name</h3>
            <TextField
                fullWidth
                value={customer_name}
                onChange={(e) => setCustomer_name(e.target.value)}
                id="filled-required"
                variant="filled"
                size='small'
                inputProps={{style: {fontSize: 15, backgroundColor: '#f7f5f5'}}}
            />
            <h3>Customer Number</h3>
            <TextField
                fullWidth
                value={customer_num}
                onChange={(e) => setCustomer_num(e.target.value)}
                id="filled-required"
                size='small'
                variant="filled"
                inputProps={{style: {fontSize: 15, backgroundColor: '#f7f5f5'}}}
            />
            <h3>Customer Email</h3>
            <TextField
                value={customer_email}
                onChange={(e) => setCustomer_email(e.target.value)}
                id="filled-required"
                fullWidth
                size='small'
                variant="filled"
                inputProps={{style: {fontSize: 15, backgroundColor: '#f7f5f5'}}}
            />
            <h3>Date and Time</h3>
        <TextField
                required
                id="filled-required"
                label=""
                fullWidth
                value={date_time}
                size='small'
                variant="filled"
                inputProps={{style: {fontSize: 15, backgroundColor: '#f7f5f5'}}}
            />
        </div>
        </div>

                <div className="col-lg-4">
                    <div> 
                        <h2> Total Amount
                        <TextField
                                value={total_price}
                                required
                                size='small'
                                id="filled-required"
                                fullWidth
                                variant="filled"
                                inputProps={{readOnly: true,style: {fontSize: 25, fontWeight: 'bold',  backgroundColor: '#f7f5f5'}}}
                            /></h2>
                        <h3>Total Quantity
                            <TextField
                                value={total_quantity}
                                required
                                id="filled-required"
                                fullWidth
                                size='small'
                                variant="filled"
                                inputProps={{style: {fontSize: 15,  backgroundColor: '#f7f5f5'}}}
                            /> </h3>
                        <h3>Tender
                            <TextField
                                value={tendered_bill}
                                onChange={(e) => setTendered_bill(e.target.value)}
                                required
                                type='number'
                                id="filled-required"
                                fullWidth
                                size='small'
                                variant="filled"
                                inputProps={{style: {fontSize: 15,  backgroundColor: '#f7f5f5'}}}
                            /> </h3>  
                        <h3>Change 
                            <TextField
                                    value={balance}
                                    required
                                    id="filled-required"
                                    fullWidth
                                    size='small'
                                    variant="filled"
                                    inputProps={{style: {fontSize: 20, fontWeight: 'bold', backgroundColor: '#f7f5f5'}}}
                                />
                        </h3>
                </div>
        </div>
        <div>
            
        </div>
            {/* If the Total Amount is equal to zero, show a message */}
            {
                total_price !== 0 ? 
                    <button className='button-record-transaction' onClick={record_transaction}>PAY NOW</button>     
                : <h1>Please add a product to the cart</h1>
            }
        </div>  
        <div className="footer"></div>
        
    </div>
 );
}