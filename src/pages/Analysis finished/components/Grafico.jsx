import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box } from '@mui/material';

const Grafico = ({ data }) => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
        chartInstance.current.destroy();
      }

    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((item) => item.name),
          datasets: [{
            label: 'Porcentaje de presencia de la categoria',
            data: data.map(item => item.confidence*100),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
  }, [data]);

  return (
    <Box style={{ width: '100%', height: '60vh', display:'flex' }} justifyContent={'center'}>
      <canvas ref={chartContainer} />
    </Box>
  );
};

export default Grafico;
