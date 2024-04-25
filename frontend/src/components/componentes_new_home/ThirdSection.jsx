import React from 'react'
import '../../stylesheets/newHome/thirdSection.css'
import arrow from '../../img/arrow_portfolio.svg'

function ThirdSection() {
  return (
    <>
      <section className='third__section'>
        <div className='third__section--container'>
          <div className='third__section--title'>
            <h3>Conoce las soluciones que tenemos para ti</h3>
            <p>Selecciona una categoría y conoce nuestro portafolio</p>
          </div>

          <div className='third__section--portfolio'>

            <div className='portfolio__item presence'>
              <span className='portfolio__item--span'>Presencia Digital</span>

              {/* lo que se mostrara cuando el contenedor tenga un hover */}
              <div className="more__info">
                <div className='more__info--container'>
                  <h4 className='more--title'>presencia digital</h4>
                  <p className='more-text'>Soluciones que potencian la visibilidad y participacion de la empresa en el entorno en linea como:</p>
                  <ul className='more-list'>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />Diseño web</li>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />Optimización de motores de búsqueda</li>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />Gestion de redes sociales</li>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />Email marketing</li>
                  </ul>
                  <a href="#" className='button'> Conoce más</a>
                </div>
              </div>
            </div>

            <div className='portfolio__item sells'>
              <span className='portfolio__item--span'>Ventas por internet</span>
              {/* lo que se mostrara cuando el contenedor tenga un hover */}
              <div className="more__info">
                <div className='more__info--container'>
                  <h4 className='more--title'>Ventas por internet</h4>
                  <p className='more-text'>Soluciones para la comercialización y venta de productos o servicios a través de plataformas en línea como:</p>
                  <ul className='more-list'>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />E-commerce</li>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />Pasarelas de pago</li>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />Mercados electrónicos</li>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />CRM</li>
                  </ul>
                  <a href="#" className='button'> Conoce más</a>
                </div>
              </div>
            </div>

            <div className='portfolio__item digitization'>
              <span className='portfolio__item--span'>Digitalización de procesos</span>
              {/* lo que se mostrara cuando el contenedor tenga un hover */}
              <div className="more__info">
                <div className='more__info--container'>
                  <h4 className='more--title'>Digitalización de procesos</h4>
                  <p className='more-text'>Soluciones para la automatización y optimización de los procesos comerciales mediante el uso de tecnología digital como:</p>
                  <ul className='more-list'>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />ERP</li>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />POS</li>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />Facturación electrónica</li>
                    <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />Plataforma logística</li>
                  </ul>
                  <a href="#" className='button'> Conoce más</a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
    </>
  )
}

export default ThirdSection