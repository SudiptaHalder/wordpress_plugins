import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ModernPieChart = ({ data, title, height = 300 }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    cutout: '70%',
  };

  return (
    <div className="modern-chart">
      {title && <h4>{title}</h4>}
      <div style={{ position: 'relative', height: `${height}px` }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ModernPieChart;