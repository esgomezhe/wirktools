import React from 'react';
import { Link } from 'react-router-dom';
import { sliderSettings, calculateIntensidadDigitalScore, calculateGestionTransformacionalScore } from '../../utils/chartConfigs';
import BarChart from '../../charts/BarChart';
import RadarChart from '../../charts/RadarChart';
import BubbleChart from '../../charts/BubbleChart';
import PercentageChart from '../../charts/PercentageChart';
import '../../stylesheets/formCompletion.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import home from '../../img/svg/home.svg';
import arrow from '../../img/svg/arrow.svg';
import figure from '../../img/svg/formulario_figure.svg';

const ResultsDisplay = ({ userData, categoryData }) => {

  const intensidadDigitalScore = calculateIntensidadDigitalScore(categoryData);
  const gestionTransformacionalScore = calculateGestionTransformacionalScore(categoryData);

  return (
    <div className="results">
      <div className="notice__container">
        <div className="figure">
          <img src={figure} alt="figure" height={155} />
        </div>
        <div className="notice__options">
          <Link to={'/'}><img src={home} alt="home" /> </Link>
          <img src={arrow} alt="arrow" />
          <p className='notice__options--text'>Formulario de línea base</p>
        </div>
        <div className="notice__title--container">
          <h4 className='notice__title'>
            {`Bienvenido, ${userData?.info?.full_name || 'Usuario'}! Estos son tus resultados de ${userData?.info?.company_type || ''}`}
          </h4>
        </div>
      </div>

      <section className="results">
        <div className="slider-container">
          <Slider {...sliderSettings}>
            {categoryData.map((category, index) => (
              <PercentageChart category={category} />
            ))}
          </Slider>
        </div>
        <div className="chart-container">
          <div className="chart">
            <BarChart categories={categoryData} />
          </div>
          <div className="chart">
            <RadarChart categories={categoryData} />
          </div>
          <div className="chart">
            <BubbleChart intensidadDigital={intensidadDigitalScore} gestionTransformacional={gestionTransformacionalScore} />
          </div>
        </div>
        <div className='restart-form'>
          <Link className='results-button restart' to='/autodiagnostico'>Rellenar otro formulario</Link>
        </div>
      </section>
    </div>
  );
};

export default ResultsDisplay;