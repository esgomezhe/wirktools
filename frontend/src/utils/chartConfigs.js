import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend);

// Función para normalizar los valores a un máximo de 5
const normalizeValue = (value, maxValue) => (value / maxValue) * 5;

// Agrega las nuevas funciones para calcular los promedios de cada categoría
export const calculateCategoryAverages = (answers) => {
  const categoryScores = {};
  const categoryCounts = {};
  let totalAnswersCount = 0;
  const categoriesDetails = {};

  answers.forEach(({ category, value, answers_count }) => {
    totalAnswersCount += answers_count;
    
    if (category.name === 'Complejidad') return;

    const categoryName = category.name;

    if (categoryScores[categoryName]) {
      categoryScores[categoryName] += value;
      categoryCounts[categoryName] += 1;
    } else {
      categoryScores[categoryName] = value;
      categoryCounts[categoryName] = 1;
      categoriesDetails[categoryName] = category;
    }
  });

  const averageAnswersCount = totalAnswersCount / answers.length;
  const maxResponseValue = Math.max(averageAnswersCount, 5); // Asegurarse que el valor máximo sea 5

  return Object.keys(categoryScores).map(categoryName => {
    const average = categoryScores[categoryName] / categoryCounts[categoryName];
    const normalizedAverage = normalizeValue(average, maxResponseValue);
    return {
      category: categoriesDetails[categoryName],
      average: normalizedAverage,
    };
  });
};

// Función para calcular el puntaje de Intensidad Digital
export const calculateIntensidadDigitalScore = (categoryAverages) => {
  const categories = ['Capacidades Digitales', 'Experiencia del Cliente', 'Resultados', 'Tecnologías Digitales Emergentes'];
  const filteredAverages = categoryAverages.filter(cat => categories.includes(cat.category.name));
  const total = filteredAverages.reduce((acc, curr) => acc + curr.average, 0);
  return filteredAverages.length > 0 ? total / filteredAverages.length : 0;
};

// Función para calcular el puntaje de Gestión Transformacional
export const calculateGestionTransformacionalScore = (categoryAverages) => {
  const categories = ['Estrategia Digital', 'Cultura Digital', 'Innovación y Colaboración', 'Gobierno Digital'];
  const filteredAverages = categoryAverages.filter(cat => categories.includes(cat.category.name));
  const total = filteredAverages.reduce((acc, curr) => acc + curr.average, 0);
  return filteredAverages.length > 0 ? total / filteredAverages.length : 0;
};

// Prepara los datos para el gráfico de barras (Bar Chart)
export const getBarChartData = (categoryAverages) => {
  return {
    data: {
      labels: categoryAverages.map(ca => ca.category.name),
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
          beginAtZero: true,
          max: 5
        }
      }
    }
  };
};

// Prepara los datos para el gráfico radar (Radar Chart)
export const getRadarChartData = (categoryAverages) => {
  return {
    data: {
      labels: categoryAverages.map(ca => ca.category.name),
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
      min: 0,
      max: 5,
      title: {
        display: true,
        text: 'Intensidad en la Gestión Transformacional',
      },
    },
    x: {
      beginAtZero: true,
      min: 0,
      max: 5,
      title: {
        display: true,
        text: 'Intensidad Digital',
      },
    },
  },
};