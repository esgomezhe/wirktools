import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { getBubbleChartData, optionsForBubbleChart } from '../utils/chartConfigs';

const BubbleChart = ({ intensidadDigital, gestionTransformacional }) => {
  const chartData = getBubbleChartData(intensidadDigital, gestionTransformacional);

  return <Bubble data={chartData} options={optionsForBubbleChart} />;
};

export default BubbleChart;