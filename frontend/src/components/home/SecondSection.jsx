import React from 'react'
import Slider from "react-slick";
import '../../stylesheets/newHome/secondSection.css'
import '../../App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//svg sliders
import digital from '../../img/svg/digital.svg'
import cultura from '../../img/svg/cultura.svg'
import capacidades from '../../img/svg/capacidades.svg'
import experiencia from '../../img/svg/experiencia.svg'
import innovacion from '../../img/svg/innovacion.svg'
import gobierno from '../../img/svg/gobierno.svg'
import tecnologia from '../../img/svg/tecnologia.svg'
import resultados from '../../img/svg/resultados.svg'

// Elemento del slide 
function SectionItems(props) {
  const { title, text, svg } = props;
  return (
    <div className='second__sections--items'>
      <div className="icon">
        <img src={svg} alt="digital" width={45} />
      </div>
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
  );
}

// Flecha derecha del slide
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`arrow ${className}`}
      style={{ ...style, display: "flex", width: "40px", height: "40px", background: 'white', justifyContent: "center", alignItems: "center", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "50%", marginRight: '-20px' }}
      onClick={onClick}
    />
  );
}

// Flecha izquierda del slide
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`arrow ${className}`}
      style={{ ...style, display: "flex", width: "40px", height: "40px", background: 'white', justifyContent: "center", alignItems: "center", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "50%", marginLeft: '-20px' }}
      onClick={onClick}
    />
  );
}

const ItemsContent = [
  { title: 'Estrategia digital', text: 'Se evalúa si la empresa tiene una estrategia clara y coherente para la transformación digital, si está alineada con los objetivos de negocio y si se estan tomando medidas para implementarla.', svg: digital },

  { title: 'Cultura digital', text: 'Evalúa si la empresa posee una cultura sólida de innovación, si los empleados están comprometidos con la transformación digital y se  promueve la colaboración y el aprendizaje continuo.', svg: cultura },

  { title: 'Capacidades digitales', text: 'Verifica si la empresa cuenta con las habilidades y talento necesarios para la transformación digital, si se invierte en la formación y desarrollo de los empleados y si la estructura organizativa es adecuada.', svg: capacidades },

  { title: 'Experiencia del cliente', text: 'Evalúa si la empresa esta aprovechando la tecnologia para mejorar la interacción con los clientes, adoptando nuevas tecnologías y midiendo los resultados para implementar mejoras continuas.', svg: experiencia },

  { title: 'Innovación y colaboración', text: 'Evalúa si la empresa fomenta la innovación, la colaboración y la adopción de nuevas tecnologías, incluyendo la exploración de colaboraciones con socios y proveedores.', svg: innovacion },

  { title: 'Gobierno digital', text: 'Evalúa si la empresa tiene una estructura de gobierno adecuada para la transformación digital, si establece políticas y normas claras para el uso de la tecnología, y la toma medidas para mitigar los riesgos asociados con la transformacion digital.', svg: gobierno },

  { title: 'Tecnologias digitales emergentes', text: 'Evalúa la adopcion de tecnologías emergentes (blockchain,robotica, IA, etc) por parte de la empresa y su preparación para nuevas oportunidades de negocio y desafios futuros.', svg: tecnologia },

  { title: 'Resultados de negocio', text: 'Evalúa el impacto positivo de la transformación digital en la empresa, la medición de resultados y las acciones de mejora continua.', svg: resultados }
];

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
      <div className="second__section--container">
        <div className='second__section--text'>
          <h3>Dimensiones que evaluaremos</h3>
          <p>Al evaluar estas dimensiones, nuestra herramienta proporciona una imagen completa del nivel de madurez digital de la empresa y ayuda a identificar las áreas en la que se pueden realizar mejoras.</p>
        </div>

        <div className="slider-container">
          <Slider {...settings} style={{ display: 'flex' }}>
            {/* Map a cada item del array 'ItemsContent' */}
            {ItemsContent.map(item => (
              <SectionItems
                key={item.title}
                title={item.title}
                text={item.text}
                svg={item.svg}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default SecondSection