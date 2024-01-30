import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Transaction {
  total_price: number;
  date_time: string;
}

export default function Chart() {
  const theme = useTheme();
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/transaction/getAllTransaction")
      .then((response) => {
        setTransactionData(response.data);
        console.log("Transaction Data: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
      });
  }, []);

  // Process transaction data and calculate total prices by hour each day
  const processData = () => {
    const hourlyTotals: { [key: string]: number } = {};

    transactionData.forEach((transaction) => {
      const date = new Date(transaction.date_time);
      const hourKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;

      if (hourlyTotals[hourKey]) {
        hourlyTotals[hourKey] += transaction.total_price;
      } else {
        hourlyTotals[hourKey] = transaction.total_price;
      }
    });

    return Object.keys(hourlyTotals).map((key) => ({
      time: key,
      amount: hourlyTotals[key],
    }));
  };

  const dataWithGrossSales = processData();

  return (
    <React.Fragment>
      <Typography>Today</Typography>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={dataWithGrossSales}
          margin={{
            top: 16,
            right: 20,
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
                fontSize: '16px',
              },
            },
          ]}
          yAxis={[
            {
              label: 'Sales ($)',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
                fontSize: '16px',
              },
              tickLabelStyle: {
                ...(theme.typography.body2 as ChartsTextStyle),
                fontSize: '16px',
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
