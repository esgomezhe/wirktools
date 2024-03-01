import React from 'react';
import BarChart from '../charts/BarChart';
import RadarChart from '../charts/RadarChart';
import { calculateCategoryAverages } from '../utils/chartConfigs';
import '../stylesheets/results.css'

function FormCompletion({ answers, onRestart }) {
  const categoryAverages = calculateCategoryAverages(answers);

  return (
    <div>
      <div className='results-text'>
        <p>¡Formulario completado!</p>
        <h2>Promedio de Puntajes por Categoría</h2>
      </div>
      <section className='results'>
        <ul className='results-category'>
          {categoryAverages.map(({ category, average }) => (
            <li className='results-category-item' key={category}>{category}: {average.toFixed(2)}</li>
          ))}
        </ul>
      </section>
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