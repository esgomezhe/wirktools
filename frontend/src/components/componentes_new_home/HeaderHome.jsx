import React from 'react'
import s from '../../stylesheets/newHome/headerHome.module.css'

function Header() {
  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <div className={s['header--logo']}>
          <img className={s['header--image']} src={require('../../img/logo.jpg')} alt="Camara de comercio de cali" />
        </div>
        <button className={s.header__button}>inicia tu autodiagnóstico</button>
      </div>
    </header>
  )
}

export default Header