import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Drawer, List, ListItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon
import AddIcon from '@mui/icons-material/Add'; // Import the AddIcon
import React, { useState, useEffect } from 'react';
import dashboard from './Images/dashboard.png';
import item_page from './Images/item_page.png';
import sales_summry from './Images/sales_summary.png'
import logout from './Images/logout.png'
import { useAuth } from '../AccountLoginValid/AuthContext';
import axios from 'axios';


export default function ItemPage() {
  const [products, setProducts] = useState([]); // State to store the product data
  const { isSalesmanLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [restockQuantity, setRestockQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null); // To keep track of the selected product for editing
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [editedProductName, setEditedProductName] = useState('');
const [editedPrice, setEditedPrice] = useState(0);
const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);


  const handleLogout = () => {
    // Delete the 'cashierToken' from local storage
    localStorage.removeItem('salesmanToken');
    // Clear the login state
    localStorage.removeItem('salesmanLoggedIn');
    // Redirect to the login page
    navigate('/loginsales');
  };

  useEffect(() => {
    // Check for a valid JWT token on page load
    const token = localStorage.getItem('salesmanToken');

    if (!token) {
      // Redirect to the login page if there's no token
      navigate('/loginsales');
    } else {
      // Verify the token on the server, handle token expiration, etc.
      // If token is valid, setIsCashierLoggedIn(true)
    }
  }, [isSalesmanLoggedIn, navigate]);


  // Function to open the Drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Function to close the Drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const [navigatorColor, setNavigatorColor] = useState('#daede5'); // Set the default color of the navigator
    // Function to highlight the color of the navigator if you are in the page using the color '#daede5'
    useEffect(() => {
        if (location.pathname === '/itempage') {
            setNavigatorColor('#daede5');
        } else {
            setNavigatorColor('#213458');
        }
    }, [location]);

    useEffect(() => {
      // Fetch product data from the API when the component mounts
      axios.get('http://localhost:8080/product/getAllProduct')
        .then((response) => {
          // Set the product data in the state
          setProducts(response.data);
        })
        .catch((error) => {
          // Handle any errors here
          console.error('Error fetching product data:', error);
        });
    }, []); // Empty dependency array ensures the effect runs once on component mount

    const openRestockDialog = (product) => {
      setSelectedProduct(product);
      setRestockQuantity(0); // Reset the input field
      setIsDialogOpen(true);
    };

    const openEditDialog = (product) => {
      setSelectedProductForEdit(product);
      setEditedProductName(product.productname);
      setEditedPrice(product.price);
      setIsEditDialogOpen(true);
    };    
    
    const handleRestock = () => {
      if (selectedProduct && restockQuantity > 0) {
        // Create the data to send to the server
        const updatedProductData = {
          productid: selectedProduct.productid,
          quantity: parseInt(restockQuantity)
        };
    
        // Send a request to update the product's quantity on the server
        axios
          .put(`http://localhost:8080/product/putQuantity?productid=${updatedProductData.productid}`, updatedProductData)
          .then((response) => {
            // Assuming the server returns a successful response
            console.log('Product quantity updated successfully.');
    
            // Update the local product data
            const updatedProducts = products.map((product) =>
              product.productid === updatedProductData.productid ? { ...product, quantity: updatedProductData.quantity } : product
            );
    
            setProducts(updatedProducts);
    
            // Close the dialog
            setIsDialogOpen(false);
          })
          .catch((error) => {
            console.error('Error updating product:', error);
            // Handle the error, display an error message, or implement error handling as needed
          });
      } else {
        // Handle invalid input or display an error message
      }
    };
    
    const handleEditProduct = () => {
      if (selectedProductForEdit && editedProductName && editedPrice >= 0) {
        // Update the product name and price for the selected product
        const updatedProduct = {
          ...selectedProductForEdit,
          productname: editedProductName,
          price: editedPrice,
        };
    
        // Make an API call to update the product on the server with the new name and price
        axios
          .put(`http://localhost:8080/product/putProduct?productid=${updatedProduct.productid}`, updatedProduct)
          .then((response) => {
            // Assuming the server returns the updated product
            const updatedProductData = response.data;
    
            // Find the index of the updated product in the products array and replace it
            const updatedProducts = products.map((product) =>
              product.productid === updatedProductData.productid ? updatedProductData : product
            );
    
            setProducts(updatedProducts);
    
            // Close the edit dialog
            setIsEditDialogOpen(false);
          })
          .catch((error) => {
            console.error('Error updating product:', error);
            // Handle the error, display an error message, or implement error handling as needed
          });
      } else {
        // Handle invalid input or display an error message
      }
    };
    
    const handleDeleteProduct = (productId) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        // Send a request to update the isDeleted flag on the server
        axios
          .put(`http://localhost:8080/product/deleteProduct/${productId}`)
          .then((response) => {
            // Assuming the server returns a successful response
            console.log('Product soft deleted successfully.');
    
            // Update the local product data by setting the isDeleted flag
            const updatedProducts = products.map((product) => {
              if (product.productid === productId) {
                return { ...product, isDeleted: true };
              }
              return product;
            });
    
            setProducts(updatedProducts);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error soft deleting product:', error);
            // Handle the error, display an error message, or implement error handling as needed
          });
      }
    };
    

    const openAddProductDialog = () => {
      setIsAddProductDialogOpen(true);
    };

    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
const [newProductName, setNewProductName] = useState('');
const [newPrice, setNewPrice] = useState(0);
const [newQuantity, setNewQuantity] = useState(0);

const handleAddProduct = () => {
  if (newProductName && newPrice >= 0 && newQuantity >= 0) {
    // Create the data for the new product
    const newProductData = {
      productname: newProductName,
      price: newPrice,
      quantity: newQuantity,
      isDeleted: false, // Set isDeleted to false for new products
    };

    // Send a POST request to add the new product
    axios
      .post('http://localhost:8080/product/postProduct', newProductData)
      .then((response) => {
        // Assuming the server successfully added the new product
        console.log('Product added successfully.');

        // Add the new product to the local product data
        const addedProduct = response.data;
        setProducts([...products, addedProduct]);

        // Close the add product dialog
        setIsAddProductDialogOpen(false);

        // Reset input fields
        setNewProductName('');
        setNewPrice(0);
        setNewQuantity(0);
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        // Handle the error, display an error message, or implement error handling as needed
      });
  } else {
    // Handle invalid input or display an error message
  }
};

const [mostPurchasedProduct, setMostPurchasedProduct] = useState(null);

useEffect(() => {
  // Fetch the product with the highest purchase count from the API
  axios
    .get('http://localhost:8080/product/most-purchased')
    .then((response) => {
      // Set the most purchased product in the state
      setMostPurchasedProduct(response.data);
    })
    .catch((error) => {
      console.error('Error fetching most purchased product:', error);
    });
}, []);

    return (
      <div>
        {/* Hamburger icon to open the Drawer */}
      <IconButton
                edge="end" 
                aria-label="open drawer"
                onClick={openDrawer}
                sx={{
                position: 'fixed',
                top: '.5rem',
                right: '2rem', 
                fontSize: '6rem', 
                zIndex: 999, 
            }}>
            <MenuIcon sx={{ fontSize: '3rem'}}/> {/* Place the MenuIcon component here */}
            </IconButton>
            {/* Drawer component */}
            <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer} sx={{ width: '5rem'}}>
                <div className='drawer-account'>
                    <Typography sx={{fontFamily:'Poppins', fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center'}}>Sales Manager</Typography>
                </div>
                <List>
                    
                    <ListItem button component={Link} to="/salessummary" className={location.pathname === '/salessummary' ? 'active-link' : ''}>
                        <h2 style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', color: '#213458', padding: 2, margin: 'auto', marginLeft: 5, marginRight: 90}}>Sales Summary</h2>
                        <img src={sales_summry} className="img_cashiering"/>
                    </ListItem>

                    <ListItem button component={Link} to="/itempage" className={location.pathname === '/itempage' ? 'active-link' : ''}>
                    <h2 style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', padding: 2, margin: '#213458', marginRight: 160, marginLeft: 5}}>Item Page</h2>
                    <img src={item_page} className="img_cashiering" />
                    </ListItem>

                    <ListItem button onClick={handleLogout} className={location.pathname === '/logout' ? 'active-link' : ''} >
                        <h2 style={{fontFamily: 'Poppins', fontSize: 25, fontWeight: 'bold', color: '#213458', padding: 2, marginRight: 200, marginLeft: 5}} >Log Out</h2>
                        <img src={logout} className='img_cashiering'/> 
                    </ListItem>
                </List>
            </Drawer>

            <div className='center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Typography variant="h2" style={{ textAlign: 'center', fontWeight: 'bold' }}>
            ITEMS
          </Typography>
          <Button
  variant="contained"
  color="primary"
  startIcon={<AddIcon />}
  style={{ marginLeft: '1rem' }}
  onClick={() => openAddProductDialog()}
>
  Add Product
</Button>
        </div>
        {mostPurchasedProduct && (
        <div>
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            Most Purchased Product:
          </Typography>
          <Typography variant="body1">
            Product Name: {mostPurchasedProduct.productname}
          </Typography>
          <Typography variant="body1">
            Purchase Count: {mostPurchasedProduct.purchaseCount}
          </Typography>
        </div>
      )}
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th> {/* Add a column for actions */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productid}>
                <td>{product.productid}</td>
                <td>{product.productname}</td>
                <td>{product.quantity}</td>
                <td>₱ {product.price}</td>
                <td>
                <Button
  variant="contained"
  color="primary"
  onClick={() => openRestockDialog(product)}
  style={{ marginRight: '8px' }}
>
  Restock
</Button>

  <Button
    variant="contained"
    color="primary"
    onClick={() => openEditDialog(product)}
  >
    Edit
  </Button>

  <Button
    variant="contained"
    color="error"
    onClick={() => handleDeleteProduct(product.productid)}
    style={{ marginLeft: '8px' }}
  >
    Delete
  </Button>
  <Dialog open={isAddProductDialogOpen} onClose={() => setIsAddProductDialogOpen(false)}>
  <DialogTitle>Add Product</DialogTitle>
  <DialogContent>
    <TextField
      label="Product Name"
      value={newProductName}
      onChange={(e) => setNewProductName(e.target.value)}
    />
    <TextField
      label="Quantity"
      type="number"
      value={newQuantity}
      onChange={(e) => setNewQuantity(e.target.value)}
    />    
    <TextField
      label="Price"
      type="number"
      value={newPrice}
      onChange={(e) => setNewPrice(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsAddProductDialogOpen(false)}>Cancel</Button>
    <Button onClick={handleAddProduct} color="primary">
      Add
    </Button>
  </DialogActions>
</Dialog>

<Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
  <DialogTitle>Restock Product</DialogTitle>
  <DialogContent>
    <TextField
      label="Restock Quantity"
      type="number"
      value={restockQuantity}
      onChange={(e) => setRestockQuantity(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
    <Button onClick={handleRestock} color="primary">
      Confirm Restock
    </Button>
  </DialogActions>
</Dialog>
<Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
  <DialogTitle>Edit Product</DialogTitle>
  <DialogContent>
    <TextField
      label="Product Name"
      value={editedProductName}
      onChange={(e) => setEditedProductName(e.target.value)}
    />
    <TextField
      label="Price"
      type="number"
      value={editedPrice}
      onChange={(e) => setEditedPrice(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
    <Button onClick={handleEditProduct} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
  }