import { Button, Typography } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';


export default function ItemPage() {
    <title>Cashiering</title>
    return (
        <div className='center'>
            <Typography variant="h2" style={{ textAlign: 'center', fontWeight: 'bold' }}>
            ITEMS
            </Typography>

            <div style={{ marginTop: '2rem', backgroundColor: '#90B7B8', padding: '0.5rem', borderRadius: '5px', marginLeft: '20rem', marginRight: '25rem' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Best Selling</Typography>
  </div>

  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Item 1</Typography>
    <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '12.6rem' }}>2x</Typography>
  </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Total Sales: P40.00</Typography>
          </div>
         </div>
   
         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', backgroundColor: '#D3D3D3', padding: '0.5rem', borderRadius: '5px', marginLeft: '22rem', marginRight: '27rem' }}>
          <Typography variant="h2" style={{ marginLeft: '8.6rem' }}>Item 1</Typography>
          <Typography variant="h2" style={{ marginRight: '12.6rem' }}>Stocks: 28</Typography>
        </div>  
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', backgroundColor: '#D3D3D3', padding: '0.5rem', borderRadius: '5px', marginLeft: '22rem', marginRight: '27rem' }}>
          <Typography variant="h2" style={{ marginLeft: '8.6rem' }}>Item 1</Typography>
          <Typography variant="h2" style={{ marginRight: '12.6rem' }}>Stocks: 12</Typography>
        </div>                   
        </div>
    );
    }