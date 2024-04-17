import React from 'react'
import Slider from "react-slick";
import '../../stylesheets/newHome/secondSection.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

function SecondSection() {

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
    <section className='second__section'>
      <div className='second__section--text'>
        <h3>Dimensiones que evaluaremos</h3>
        <span>Al evaluar estas dimensiones, nuestra herramienta proporciona una imagen completa del nivel de madurez digital de la empresa y ayuda a identificar las areas en la que se pueden realizar mejoras</span>
      </div>

      <div className='second__section--categorys'>
        <Slider {...settings}>
          <div className='second__sections--items'>
            <h5>Estrategia digital</h5>
            <p>Se evalua si la empresa tiene una estrategia clara y coherente para la transformacion digital. si esta alineada con los objetivos de negocio y si se estan tomando medidas para implementarla</p>
          </div>

          <div className='second__sections--items'>
            <h5>Cultura digital</h5>
            <p>Evalua si la empresa posee una cultura solida de innovacion. si los empleados estan comprometidos con la transofmracion digital y se promueve la colaboracion y el aprendizaje continuo</p>
          </div>

          <div className='second__sections--items'>
            <h5>Capacidades digitales</h5>
            <p>Verifica si la empresa cuenta con las habilidades y talento necesarios para la transformacion digital, si se invierte en la formacion y desarrollo de los empleados y si la estructura organizativa es adecuada</p>
          </div>

          <div className='second__sections--items'>
            <h5>Experiencia del cliente</h5>
            <p>Evalua si la empresa esta aprovechando la tecnologica para mejorar la intraccion con los clientes, adoptando nuevas tecnologias y midiendo los resultados para implementar mejoras continuas</p>
          </div>

          <div className='second__sections--items'>
            <h5>Innovacion y colaboracion</h5>
            <p>Evalua si la empresa fomenta la innovacion, la colaboracion y la adopcion de nuevas tecnologias, incluyendo la exploracion de colaboraciones con socios y proveedores</p>
          </div>

          <div className='second__sections--items'>
            <h5>Gobierno digital</h5>
            <p>Evalua si la empresa tiene una estructura de gobierno adecuada para la transformacion digital, si establece politicas y normas claras para el uso de la tecnologia, y la toma medidas para mitigar los riesgos asociados con la transformacion digital</p>
          </div>

          <div className='second__sections--items'>
            <h5>Tecnologias digitales emergentes</h5>
            <p>Evalua la adopcion de tecnologias emergentes(blockchain,robotica, IA, etc) por parte de la empresa y su preparacion para nuevas oportunidades de negocio y desafios futuros</p>
          </div>

          <div className='second__sections--items'>
            <h5>Resultados de negocio</h5>
            <p>Evalua el impacto positivo de la transformacion digital en la empresa, la medicion de resultados y las acciones de mejora continua</p>
          </div>
        </Slider>
      </div>
    </section>
  )
}

export default SecondSection