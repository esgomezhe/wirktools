import React from 'react'
import s from '../../stylesheets/newHome/hero.module.css'

function Hero() {
  return (
    <>
      <div className={s.hero}>
        <div className={s.hero__content}>
          <h1>Bienvenidos a nuestra <br /> herramienta de Autodiagnóstico</h1>
          <a href="">Descubre tu nivel de madurez digital</a>
        </div>
      </div>
    </>
  )
}

export default Hero