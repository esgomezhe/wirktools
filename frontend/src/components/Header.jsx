import React from 'react';
import { Link } from "react-router-dom";
import '../stylesheets/newHome/headerHome.css';

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header--logo'>
          {/* Envolver la imagen con Link para redirigir a la página principal */}
          <Link to='/'>
            <img className='header--image' src={require('../img/logo.jpg')} alt="Cámara de Comercio de Cali" />
          </Link>
        </div>
        <div className='header__buttons'>
          <Link to={'/autodiagnostico/'} className='header__button'>Inicia tu autodiagnóstico</Link>
          <Link to={'/lineabase/'} className='header__button'>Preguntas de línea base</Link>
          <Link to={'/resultados/'} className='header__button'>Resultados</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;