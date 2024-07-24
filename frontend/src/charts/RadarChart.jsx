import React from 'react';
import { Radar } from 'react-chartjs-2';
import { getRadarChartData } from './chartConfigs';

function RadarChart({ categoryAverages }) {
  const chartData = getRadarChartData(categoryAverages);

  return <Radar data={chartData.data} options={chartData.options} />;
}

export default RadarChart;