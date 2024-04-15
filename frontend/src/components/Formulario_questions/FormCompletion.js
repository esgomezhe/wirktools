import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart';
import RadarChart from '../../charts/RadarChart';
import BubbleChart from '../../charts/BubbleChart';
import PercentageChart from '../../charts/PercentageChart';
import { calculateCategoryAverages, calculateIntensidadDigitalScore, calculateGestionTransformacionalScore } from '../../utils/chartConfigs';
import '../../stylesheets/formCompletion.css';

function FormCompletion({ onRestart }) {
  // Este estado local ahora almacenará las respuestas recuperadas de localStorage si están disponibles.
  const [localAnswers, setLocalAnswers] = useState([]);

  useEffect(() => {
    // Intenta recuperar las respuestas de localStorage al montar el componente
    const savedAnswers = localStorage.getItem('formAnswers');
    if (savedAnswers) {
      setLocalAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  // Continúa utilizando las funciones de cálculo como antes, pero con las respuestas locales.
  const categoryAverages = calculateCategoryAverages(localAnswers);
  const intensidadDigitalScore = calculateIntensidadDigitalScore(categoryAverages);
  const gestionTransformacionalScore = calculateGestionTransformacionalScore(categoryAverages);

  // Función modificada para reiniciar el formulario
  const handleRestart = () => {
    onRestart(); // Llama a la función onRestart pasada como prop, que debería manejar la lógica de reinicio.
    localStorage.removeItem('formAnswers'); // Asegúrate de limpiar las respuestas guardadas en localStorage.
    localStorage.removeItem('isFormCompleted'); // Asegúrate de limpiar el indicador de formulario completado.
  };

  return (
    <div>
      <div className='results-text'>
        <h3>¡Formulario completado!</h3>
        <h1>Resultados</h1>
      </div>
      <section className="results">
        {categoryAverages.map(({ category, average }) => (
          <PercentageChart key={category.slug} category={category} score={average} />
        ))}
      </section>
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
      <div className='restart-form'>
        <button className='results-button restart' onClick={handleRestart}>Rellenar otro formulario</button>
      </div>
    </div>
  );
}

export default FormCompletion;