import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './CSS Files/Chart.css';

interface Transaction {
  total_price: number;
  date_time: string;
}

export default function Chart() {
  const theme = useTheme();
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get("https://dilven-springboot.onrender.com/transaction/getAllTransaction")
      .then((response) => {
        setTransactionData(response.data);
        console.log("Transaction Data: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
      });
  }, []);

  // Process transaction data and calculate total prices by date
  const processData = () => {
    const dailyTotals: { [key: string]: number } = {};

    transactionData.forEach((transaction) => {
      const date = new Date(transaction.date_time);
      const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      if (dailyTotals[dateKey]) {
        dailyTotals[dateKey] += transaction.total_price;
      } else {
        dailyTotals[dateKey] = transaction.total_price;
      }
    });

    return Object.keys(dailyTotals).map((key) => ({
      time: key,
      amount: parseFloat(dailyTotals[key].toFixed(2)),
    }));
  };

  const dataWithGrossSales = processData();

  return (
    <React.Fragment>
      <Typography variant='h4'sx={{ fontWeight: 600, color: 'rgb(58, 110, 112)', marginBottom: 2}}>Today</Typography>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={dataWithGrossSales}
          margin={{
            top: 16,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: {
                ...(theme.typography.body2 as ChartsTextStyle),
                fontSize: '14px', 
              },
            },
          ]}
          yAxis={[
            {
              label: 'Sales (₱)',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
                fontSize: '14px', 
              },
              tickLabelStyle: {
                ...(theme.typography.body2 as ChartsTextStyle),
                fontSize: '14px', 
              },
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
