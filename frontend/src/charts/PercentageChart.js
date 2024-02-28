import React from 'react';

const getCircleColor = (percentage) => {
    if (percentage < 33) return "#e74c3c";
    else if (percentage < 66) return "#f1c40f";
    return "#2ecc71";
};

const PercentageChart = ({ category, score }) => {
    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;
    const percentage = (score / 5) * 100;
    const strokeLength = (percentage / 100) * circumference;
    const strokeRemainder = circumference - strokeLength;
    const color = getCircleColor(percentage);

    return (
        <div style={{ margin: '20px' }}>
            <div className="survey-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h5 style={{ marginBottom: '5px' }}>{category}:</h5>
                <div style={{ fontSize: '1.5em', color: '#00ccff' }}>{score.toFixed(2)}/5</div>
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
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2.5em', color: color }}>
                    {Math.round(percentage)}%
                </div>
            </div>
        </div>
    );
};

export default PercentageChart;