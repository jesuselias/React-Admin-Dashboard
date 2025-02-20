import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsWebsiteVisits } from '../analytics-apple';

interface StockData {
  date: string;
  price: number;
}

export function AppleAnalyticsView() {
  const [data, setData] = useState<StockData[]>([]);

  const baseURL = "https://api-sigma-sage.vercel.app";
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<StockData[]>(`${baseURL}/api/stocks`, {
          headers: {
            Accept: "application/json"
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Transformar y ordenar los datos para el gráfico
  const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Crear las categorías y datos de la serie utilizando los datos ordenados
  const chartData = {
    categories: sortedData.map(item => new Date(item.date).toLocaleDateString('default', { month: 'short', year: 'numeric' })),
    series: [
      {
        name: 'AAPL',
        data: sortedData.map(item => item.price),
      },
    ],
  };

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Apple
      </Typography>

      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid xs={22} md={22} lg={12}>
          <AnalyticsWebsiteVisits
            title="AAPL (Apple) end-of-day stock prices"
            subheader="12 months"
            chart={chartData}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
