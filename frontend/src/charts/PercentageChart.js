import React, { useState } from 'react';
import Popup from '../components/Popup';
import '../stylesheets/results.css';

const getCircleColor = (percentage) => {
    if (percentage < 33) return "#e74c3c";
    else if (percentage < 66) return "#f1c40f";
    return "#2ecc71";
};

const PercentageChart = ({ category, score }) => {
    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;
    const percentage = (score / 5) * 100; // Asumiendo que la puntuación máxima es 5
    const strokeLength = (percentage / 100) * circumference;
    const strokeRemainder = circumference - strokeLength;
    const color = getCircleColor(percentage);
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
            <div className="survey-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h5 style={{ marginBottom: '5px' }}>{category.name}:</h5>
                <div style={{ fontSize: '1.5em', color: '#00ccff' }}>{score.toFixed()}/5</div>
            </div>
            <div className="circle-container" style={{ position: 'relative', width: '150px', height: '150px', margin: '20px auto' }}>
                <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                        d="M18 18m -15, 0a 15,15 0 1,0 30,0a 15,15 0 1,0 -30,0"
                        fill="none" stroke="#eee" strokeWidth="2.8" />
                    <path className="circle"
                        strokeDasharray={`${strokeLength},${strokeRemainder}`}
                        d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2.5em', color }}>
                    {Math.round(percentage)}%
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button className='results-button' onClick={togglePopup}>Autodiagnóstico</button>
                <Popup isOpen={isPopupOpen} onClose={togglePopup}>
                    <h2>{category.name}:</h2>
                    {/* Ajuste para mostrar el texto del plan para el nivel 1 */}
                    <div dangerouslySetInnerHTML={{ __html: planToShow }}></div>
                </Popup>
            </div>
        </div>
    );
};

export default PercentageChart;