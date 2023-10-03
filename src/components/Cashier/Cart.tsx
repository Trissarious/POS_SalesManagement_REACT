import React, { useEffect, useState } from 'react';
import { Product, RestProduct } from '../REST/REST Product/RestProduct';
import axios from 'axios';

// Initialize an empty array to store selected product IDs
const initialSelectedProducts: any[] | (() => any[]) = [];
const post_transaction = 'http://localhost:8080/transaction/postTransaction';
const get_product = 'http://localhost:8080/product/getAllProduct';

export default function Cart()  {
  const [selectedProducts, setSelectedProducts] = useState(initialSelectedProducts);
  const [deleteByID, getProductByID, editProduct, addProduct, product] = RestProduct();
  const [products, setProduct] = useState([product])

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

  // Function to add a selected product ID to the state
  const addProductToSelection = (productid: any) => {
    setSelectedProducts([...selectedProducts, productid]);
  };

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

  // Function to record a transaction with multiple product IDs
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
        product: selectedProducts.map((productid) => ({ productid: productid })),
        // account:{
        //     userid:userid
        // }
      })
      .then((res) => {
        console.log(res.data);
        alert('Transaction Complete');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* Render your product selection UI here */}
      {/* For each product, provide a way for the user to select it and call addProductToSelection */}
      {products.map((product) => (
        <div key={product?.productid}>
          <label>
            <input
              type="checkbox"
              onChange={() => addProductToSelection(product?.productid)}
              checked={selectedProducts.includes(product?.productid)}
            />
            {product?.productname}
          </label>
        </div>
      ))}

      {/* Button to initiate the transaction */}
      <button onClick={record_transaction}>Record Transaction</button>
    </div>
  );
};