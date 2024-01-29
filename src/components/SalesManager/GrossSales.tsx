import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function GrossSales() {
  return (
    <React.Fragment>
      <Typography  sx={{ fontSize: 22, color: 'rgb(58, 110, 112)', fontFamily: 'sans-serif' }}>Recent Deposits</Typography>
      <Typography component="p" variant="h2">
          $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, fontSize: 16 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link to="/transactions" style={{ textDecoration: 'none' }} color="primary">
          View Transactions
        </Link>
      </div>
    </React.Fragment>
  );
}