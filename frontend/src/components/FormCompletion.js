import React from 'react';
import BarChart from '../charts/BarChart';
import RadarChart from '../charts/RadarChart';
import { calculateCategoryAverages } from '../utils/chartConfigs';

function FormCompletion({ answers, onRestart }) {
  const categoryAverages = calculateCategoryAverages(answers);

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
        <BarChart categoryAverages={categoryAverages} />
      </div>
      <div className="chart-container">
        <RadarChart categoryAverages={categoryAverages} />
      </div>
      <button onClick={onRestart}>Rellenar otro formulario</button>
    </div>
  );
}

export default FormCompletion;