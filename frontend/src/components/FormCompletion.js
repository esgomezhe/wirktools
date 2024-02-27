import React from 'react';
import BarChart from '../charts/BarChart';
import RadarChart from '../charts/RadarChart';
import BubbleChart from '../charts/BubbleChart'; // Asegúrate de tener este componente
import { calculateCategoryAverages, calculateIntensidadDigitalScore, calculateGestionTransformacionalScore } from '../utils/chartConfigs';

function FormCompletion({ answers, onRestart }) {
  const categoryAverages = calculateCategoryAverages(answers);

  // Calcula los promedios para Intensidad Digital y Gestión Transformacional
  const intensidadDigitalScore = calculateIntensidadDigitalScore(categoryAverages);
  const gestionTransformacionalScore = calculateGestionTransformacionalScore(categoryAverages);

  return (
    <div>
      <p>¡Formulario completado!</p>
      <h2>Promedio de Puntajes por Categoría</h2>
      <ul>
        {categoryAverages.map(({ category, average }) => (
          <li key={category}>{category}: {average.toFixed(2)}</li>
        ))}
      </ul>
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
      <button onClick={onRestart}>Rellenar otro formulario</button>
    </div>
  );
}

export default FormCompletion;