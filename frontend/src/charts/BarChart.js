import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getBarChartData } from '../utils/chartConfigs';

function BarChart({ categoryAverages }) {
  const chartData = getBarChartData(categoryAverages);

  return <Bar data={chartData.data} options={chartData.options} />;
}

export default BarChart;