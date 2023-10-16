import { Typography } from '@mui/material';



export default function SalesSummary() {
    <title>Sales Summary</title>
    return (
        <div className='center'>
            
        <Typography variant="h2" style={{ textAlign: 'center', fontWeight: 'bold' }}>
          SALES SUMMARY
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Gross Sales</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div>   

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Refunds</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div> 

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Discounts</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div> 

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Returns</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div> 

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5rem', backgroundColor: '#90B7B8', padding: '0.5rem', borderRadius: '5px', marginLeft: '20rem', marginRight: '25rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginLeft: '8.6rem' }}>Net Sales</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold', marginRight: '12.6rem' }}>0.00</Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginLeft: '29rem' }}>Totals</Typography>
          <Typography variant="h2" style={{ fontWeight: 'bold' , marginRight: '38rem' }}>0.00</Typography>
        </div> 

        </div>
    );
    }