import React from 'react'
import Slider from "react-slick";
import '../../stylesheets/newHome/thirdSection.css'
import arrow from '../../img/arrow_portfolio.svg'
import { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HoverContent = ({ title, text, item1, item2, item3, item4 }) => (
  <div className="hoverContent__item">
    <div className='hoverContent__info--container'>
      <h4 className='more--title'>{title}</h4>
      <p className='more-text'>{text}</p>
      <ul className='more-list'>
        <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />{item1}</li>
        <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />{item2}</li>
        <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />{item3}</li>
        <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />{item4}</li>
      </ul>
      <a href="#" className='button'> Conoce más</a>
    </div>
  </div>
)

const SliderItems = [
  { title: 'presencia digital', text: 'Soluciones que potencian la visibilidad y participación de la empresa en el entorno en línea como:', item1: 'Diseño web', item2: 'Gestión de redes sociales', item3: 'Optimización de motores de búsqueda', item4: 'Email marketing' },

  { title: 'Ventas por internet', text: 'Soluciones para la comercialización y venta de productos o servicios a través de plataformas en línea como:', item1: 'E-commerce', item2: 'Pasarelas de pago', item3: 'Mercados electrónicos', item4: 'CRM' },

  { title: 'Digitalización de procesos', text: 'Soluciones para la automatización y optimización de los procesos comerciales mediante el uso de tecnología digital como:', item1: 'ERP', item2: 'POS', item3: 'Facturación electrónica', item4: 'Plataforma logística' }

]

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

const SliderContent = () => (
  <div className="slider-container">
    <Slider {...settings}>
      {SliderItems.map(item => (
        <HoverContent
          key={item.title}
          title={item.title}
          text={item.text}
          item1={item.item1}
          item2={item.item2}
          item3={item.item3}
          item4={item.item4}
        />
      ))}
    </Slider>
  </div>
)

const PortfolioItems = ({ image, span, title, text, item1, item2, item3, item4 }) => (
  <div className={`portfolio__item ${image}`}>
    <span className='portfolio__item--span'>{span}</span>
    <div className="more__info">
      <div className='more__info--container'>
        <h4 className='more--title'>{title}</h4>
        <p className='more-text'>{text}</p>
        <ul className='more-list'>
          <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />{item1}</li>
          <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />{item2}</li>
          <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />{item3}</li>
          <li className='more-list--item'><img src={arrow} alt="arrow" style={{ marginRight: '10px', width: '16px' }} />{item4}</li>
        </ul>
        <a href="#" className='button'> Conoce más</a>
      </div>
    </div>
  </div>
)

const PortfolioContent = [
  { image: 'presence', span: 'Presencia Digital', title: 'presencia digital', text: 'Soluciones que potencian la visibilidad y participación de la empresa en el entorno en línea como', item1: 'Diseño web', item2: 'Gestión de redes sociales', item3: 'Optimización de motores de búsqueda', item4: 'Email marketing' },

  { image: 'sells', span: 'Ventas por internet', title: 'Ventas por internet', text: 'Soluciones para la comercialización y venta de productos o servicios a través de plataformas en línea como:', item1: 'E-commerce', item2: 'Pasarelas de pago', item3: 'Pasarelas de pago', item4: 'CRM' },

  { image: 'digitization', span: 'Digitalización de procesos', title: 'Digitalización de procesos', text: 'Soluciones para la automatización y optimización de los procesos comerciales mediante el uso de tecnología digital como:', item1: 'ERP', item2: 'POS', item3: 'Facturación electrónica', item4: 'Plataforma logística' }
]

const Portfolio = () => (
  PortfolioContent.map(item => (
    <PortfolioItems
      key={item.title}
      image={item.image}
      span={item.span}
      title={item.title}
      text={item.text}
      item1={item.item1}
      item2={item.item2}
      item3={item.item3}
      item4={item.item4}
    />
  ))
)


function ThirdSection() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <section className='third__section'>
        <div className='third__section--container'>
          <div className='third__section--title'>
            <h3>Conoce las soluciones que tenemos para ti</h3>
            <p>Selecciona una categoría y conoce nuestro portafolio</p>
          </div>
          {isMobile ? <SliderContent /> : <div className='third__section--portfolio'><Portfolio /> </div>}
        </div>
      </section>
    </>
  )
}
export default ThirdSection