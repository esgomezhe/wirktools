import React from 'react'
import '../../stylesheets/newHome/firstSection.css'

function FirstSection() {
  return (
    <section className='first__section'>
      <div className='first__section--container'>
        <div className='first_section--image-container'>
          <img className='first_section--image' src={require('../../img/Vector.png')} alt="prueba" loading='lazy' />
        </div>

        <div className='first_section--text'>
          <div className='first-text'>
            <p>
              La herramienta desarrollada por la Cámara de Comercio de Cali permite a las empresas evaluar su madurez digital y recibir recomendaciones para mejorar su capacidad de transformación digital.
            </p>
          </div>
          <div className='second-text'>
            <p>
              La transformación digital es esencial para obtener ventajas competitivas y satisfacer las demandas del mercado, aunque enfrenta desafios. Es crucial que las empresas comprendan su nivel actual de madurez digital y las áreas que necesitan mejorar para lograr una tranformación digital exitosa. La herramienta ofrece un diagnóstico <br />completo y profundo, evaluando dimensiones clave para medianas y grandes empresas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FirstSection