import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
    Legend
  );
  
export const calculateCategoryAverages = (answers) => {
  const categoryScores = {};
  const categoryCounts = {};

  answers.forEach(({ category, value }) => {
    //Omitimos alguna categoría en especifico, en este caso "Complejidad"
    if (category === "Complejidad") return;

    if (categoryScores[category]) {
      categoryScores[category] += value;
      categoryCounts[category] += 1;
    } else {
      categoryScores[category] = value;
      categoryCounts[category] = 1;
    }
  });

  return Object.keys(categoryScores).map(category => ({
    category,
    average: (categoryScores[category] / categoryCounts[category]) / Math.max(...Object.values(categoryScores)) * 5,
  }));
};

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