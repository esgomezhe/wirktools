import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend);

// Agrega las nuevas funciones para calcular los promedios de cada categoría
export const calculateCategoryAverages = (answers) => {
  const categoryScores = {};
  const categoryCounts = {};
  let totalAnswersCount = 0; // Para sumar todos los answers_count

  answers.forEach(({ category, value, answers_count }) => {
    totalAnswersCount += answers_count; // Sumar al total de answers_count
    
    if (category.name === 'Complejidad') return;

    if (categoryScores[category.name]) {
      categoryScores[category.name] += value;
      categoryCounts[category.name] += 1;
    } else {
      categoryScores[category.name] = value;
      categoryCounts[category.name] = 1;
    }
  });

  // Calcular el promedio de answers_count para todas las respuestas
  const averageAnswersCount = totalAnswersCount / answers.length;

  // Usar el promedio de answers_count como maxResponseValue
  const maxResponseValue = averageAnswersCount;

  return Object.keys(categoryScores).map(category => {
    const average = categoryScores[category] / categoryCounts[category];
    // Normalizar el promedio en una escala de 1 a 5, donde el valor máximo posible de respuestas se ajusta a 5
    const normalizedAverage = (average * 5) / maxResponseValue;
    return {
      category,
      average: normalizedAverage,
    };
  });
};

// Función para calcular el puntaje de Intensidad Digital
export const calculateIntensidadDigitalScore = (categoryAverages) => {
  const categories = ['Capacidades Digitales', 'Experiencia del Cliente', 'Resultados', 'Tecnologías Digitales Emergentes'];
  const filteredAverages = categoryAverages.filter(cat => categories.includes(cat.category));
  const total = filteredAverages.reduce((acc, curr) => acc + curr.average, 0);
  return filteredAverages.length > 0 ? total / filteredAverages.length : 0;
};

// Función para calcular el puntaje de Gestión Transformacional
export const calculateGestionTransformacionalScore = (categoryAverages) => {
  const categories = ['Estrategia Digital', 'Cultura Digital', 'Innovación y Colaboración', 'Gobierno Digital'];
  const filteredAverages = categoryAverages.filter(cat => categories.includes(cat.category));
  const total = filteredAverages.reduce((acc, curr) => acc + curr.average, 0);
  return filteredAverages.length > 0 ? total / filteredAverages.length : 0;
};

// Prepara los datos para el gráfico de barras (Bar Chart)
export const getBarChartData = (categoryAverages) => {
    // Retorna la configuración del gráfico de barras
    return {
      data: {
        labels: categoryAverages.map(ca => ca.category),
        datasets: [
          {
            label: 'Puntaje Promedio',
            data: categoryAverages.map(ca => ca.average),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
};

// Prepara los datos para el gráfico radar (Radar Chart)
export const getRadarChartData = (categoryAverages) => {
    // Retorna la configuración del gráfico radar
    return {
      data: {
        labels: categoryAverages.map(ca => ca.category),
        datasets: [
          {
            label: 'Puntaje Promedio',
            data: categoryAverages.map(ca => ca.average),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 5,
          }
        }
      }
    };
};

// Prepara los datos para el gráfico cartesiano (Bubble Chart)
export const getBubbleChartData = (intensidadDigital, gestionTransformacional) => {
  return {
    datasets: [{
      label: ['Intensidad'],
      data: [{
        x: intensidadDigital,
        y: gestionTransformacional,
        r: 10 // Tamaño de la burbuja
      }],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
    }],
  };
};

// Opciones para el Bubble Chart (ajustadas según necesidad)
export const optionsForBubbleChart = {
  scales: {
    y: {
      beginAtZero: true,
      min: 0, // Establece el mínimo del eje Y en 0
      max: 5, // Establece el máximo del eje Y en 5
      title: {
        display: true,
        text: 'Intensidad en la Gestión Transformacional',
      },
    },
    x: {
      beginAtZero: true,
      min: 0, // Establece el mínimo del eje X en 0
      max: 5, // Establece el máximo del eje X en 5
      title: {
        display: true,
        text: 'Intensidad Digital',
      },
    },
  },
};

