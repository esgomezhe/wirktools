import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart';
import RadarChart from '../../charts/RadarChart';
import BubbleChart from '../../charts/BubbleChart';
import PercentageChart from '../../charts/PercentageChart';
import Slider from "react-slick";
import { calculateCategoryAverages, calculateIntensidadDigitalScore, calculateGestionTransformacionalScore } from '../../utils/chartConfigs';
import home from '../../img/svg/home.svg'
import arrow from '../../img/svg/arrow.svg'
import figure from '../../img/svg/formulario_figure.svg'
import { Link } from 'react-router-dom';
import '../../stylesheets/formCompletion.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Flecha derecha del slide
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`arrow ${className}`}
      style={{ ...style, display: "flex", width: "40px", height: "40px", background: 'white', justifyContent: "center", alignItems: "center", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "50%", marginRight: '-2px' }}
      onClick={onClick}
    />
  );
}

// Flecha izquierda del slide
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`arrow ${className}`}
      style={{ ...style, display: "flex", width: "40px", height: "40px", background: 'white', justifyContent: "center", alignItems: "center", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "50%", marginLeft: '-2px' }}
      onClick={onClick}
    />
  );
}

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

  var settings = {

    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div>
      <section className="results">
        <div className='nav__container'>
          <div className="figure">
            <img src={figure} alt="figure" width={205} />
          </div>
          <div className='options__container'>
            <div className="notice__option">
              <Link to={'/'}><img src={home} alt="home" /> </Link>
              <img src={arrow} alt="arrow" />
              <p className='notice__options--text'>Resultados</p>
            </div>
            <div className="nav__title--container">
              <h4 className='nav__title'>Resultados</h4>
            </div>
          </div>
        </div>

        <div className="slider-container">
          <Slider {...settings}>
            {categoryAverages.map(({ category, average }) => (
              <PercentageChart key={category.slug} category={category} score={average} />
            ))}
          </Slider>
        </div>

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
      </section>
    </div>
  );
}

export default FormCompletion;