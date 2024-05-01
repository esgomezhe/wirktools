import React from 'react'
import { Link } from "react-router-dom";
import '../../stylesheets/newHome/headerHome.css'

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header--logo'>
          <img className='header--image' src={require('../../img/logo.jpg')} alt="Camara de comercio de cali" />
        </div>
        <Link to={'/formulario'} className='header__button'>inicia tu autodiagnóstico</Link>
      </div>
    </header>
  )
}

export default Header