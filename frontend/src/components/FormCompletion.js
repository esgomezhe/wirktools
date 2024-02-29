import React from 'react';
import BarChart from '../charts/BarChart';
import RadarChart from '../charts/RadarChart';
import BubbleChart from '../charts/BubbleChart';
import PercentageChart from '../charts/PercentageChart';
import { calculateCategoryAverages, calculateIntensidadDigitalScore, calculateGestionTransformacionalScore } from '../utils/chartConfigs';

function FormCompletion({ answers, onRestart }) {
  const categoryAverages = calculateCategoryAverages(answers);

  // Calcula los promedios para Intensidad Digital y Gestión Transformacional
  const intensidadDigitalScore = calculateIntensidadDigitalScore(categoryAverages);
  const gestionTransformacionalScore = calculateGestionTransformacionalScore(categoryAverages);

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h3>¡Formulario completado!</h3>
        <h1>Resultados</h1>
      </div>
      <div className="chart-container">
        {categoryAverages.map(({ category, average }) => (
                    <PercentageChart key={category.slug} category={category} score={average} />
                ))}
      </div>
      <div className="chart-container">
        <div className="chart">
          <BarChart categoryAverages={categoryAverages} />
        </div>
        <div className="chart">
          <RadarChart categoryAverages={categoryAverages} />
        </div>
        <div className="chart">
          <BubbleChart intensidadDigital={intensidadDigitalScore} gestionTransformacional={gestionTransformacionalScore} />
        </div>
      </div>
      <div style={{ textAlign: 'center', margin: '50px' }}>
        <button onClick={onRestart}>Rellenar otro formulario</button>
      </div>
    </div>
  );
}

export default FormCompletion;