import React, { useState } from 'react';
import Popup from '../components/Popup';
import '../stylesheets/formCompletion.css';


const PercentageChart = ({ category, score }) => {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const percentage = (score / 5) * 100; // Asumiendo que la puntuación máxima es 5
  const strokeLength = (percentage / 100) * circumference;
  const strokeRemainder = circumference - strokeLength;
  // const color = getCircleColor(percentage);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // Función para encontrar el plan basado en el score promedio normalizado
  const findPlanForScore = (score, levels) => {
    // Definir los rangos de puntuación para los niveles
    let levelNeeded = 1;
    if (score < 2) levelNeeded = 1;
    else if (score < 3) levelNeeded = 2;
    else if (score < 4) levelNeeded = 3;
    else if (score >= 4) levelNeeded = 4;

    // Encontrar el nivel correspondiente
    const level = levels.find(level => level.level === levelNeeded);
    // Obtener el texto del plan para ese nivel, o un mensaje predeterminado
    return level ? level.plans.map(plan => plan.text).join(', ') : 'No hay planes para este nivel';
  };

  // Usar la función findPlanForScore para obtener el texto del plan basado en el score promedio normalizado
  const planToShow = findPlanForScore(score, category.levels);

  return (

    <div className='results-category'>
      <div className="survey-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <h5 style={{ fontSize: '14px', marginBottom: '0', width: '63%' }}>{category.name}</h5>
        <div style={{ fontSize: '12px', color: '#fff', borderRadius: '100px', border: '3px solid rgba(250, 250, 250, 0.34)', padding: '2px 10px' }}>{score.toFixed()} / 6</div>
      </div>
      <div className="circle-container" style={{ position: 'relative', width: '150px', height: '150px', margin: '20px auto' }}>
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path className="circle-bg"
            d="M18 18m -15, 0a 15,15 0 1,0 30,0a 15,15 0 1,0 -30,0"
            fill="none" stroke="#eee" strokeWidth="2.8" />
          <path className="circle"
            strokeDasharray={`${strokeLength},${strokeRemainder}`}
            d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none" stroke='#65D7B7' strokeWidth="2.8" strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '28px', color: '#FFF' }}>
          {Math.round(percentage)}%
        </div>
      </div>
      <div className='button-container'>
        <button className='results-button' onClick={togglePopup}>Ver detalle</button>
        <Popup isOpen={isPopupOpen} onClose={togglePopup}>
          <h2 style={{ color: 'black' }}>{category.name}:</h2>
          {/* Ajuste para mostrar el texto del plan para el nivel 1 */}
          <div style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: planToShow }}></div>
        </Popup>
      </div>
    </div>
  );
};

export default PercentageChart;