import React from 'react'
import { Link } from "react-router-dom";
import '../../stylesheets/newHome/headerHome.css'

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header--logo'>
          {/* Envolver la imagen con Link para redirigir a la página principal */}
          <Link to='/'>
            <img className='header--image' src={require('../../img/logo.jpg')} alt="Cámara de Comercio de Cali" />
          </Link>
        </div>
        <Link to={'/autodiagnostico/'} className='header__button'>Inicia tu autodiagnóstico</Link>
      </div>
    </header>
  )
}

export default Header