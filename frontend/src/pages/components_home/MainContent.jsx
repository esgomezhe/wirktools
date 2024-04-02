import React from "react";
import "../stylesheets/main.css";
import { CheckCircleSolid, TransitionRightSolid } from "iconoir-react"

const CategoryElement = ({ category, text }) => (
  <li className="categorys-list-element">
    <span className="checkbox"><CheckCircleSolid color="#F2661F" /></span>
    <p> <span className="checkbox">{category}</span>{text}</p>
  </li>
)

const Services = ({ classCard, classText, text }) => (
  <a href="/formularioMicro" className="service">
    <div
      className={classCard}>
      <div className="overlay"></div>
    </div>
    <div className={classText}>
      <h4>{text}</h4>
    </div>
  </a>
)

function MainContent() {
  return (
    <main className="main">
      <div className="main-content">

        <section className="section-title">
          <div>
            <h1 className="title">Bienvenidos a nuestra herramienta de autodiagnóstico</h1>
            <h4 className="description-title">Descubre tu nivel de madurez digital</h4>
          </div>
        </section>

        <div className="tools-information">
          <section className="section-content">
            <div className="section-content-text">
              <p>
                Bienvenidos a nuestra herramienta de autodiagnóstico del nivel de madurez en la transformación digital desarrollada por la Cámara de Comercio de Cali y Wirk Consulting SAS. Esta herramienta está diseñada para ayudar a las empresas a evaluar su nivel de madurez digital en diferentes áreas clave, y proporcionar recomendaciones para mejorar su capacidad de transformación digital.</p>
              <p>
                La transformación digital se ha convertido en una necesidad para todas las empresas en la actualidad. La implementación de tecnologías digitales y la adopción de nuevas formas de trabajar pueden ofrecer a las empresas ventajas competitivas y mejorar su capacidad de satisfacer las necesidades de los clientes y del mercado.
              </p>
              <p>
                Sin embargo, la transformación digital no es un proceso fácil y puede presentar desafíos para las empresas. Por esta razón, es importante que las empresas comprendan su nivel de madurez digital actual y tengan una visión clara de las áreas que deben mejorar para lograr una transformación digital exitosa.
              </p>
              <p>
                Nuestra herramienta de diagnóstico del nivel de madurez en la transformación digital de medianas y grandes empresas es muy completa y profunda, ya que evalúa las dimensiones clave que deben ser consideradas para una transformación digital exitosa.
              </p>
              <p>
                Las dimensiones a evaluar son:
              </p>
            </div>

            <section className="categorys">
              <ul className="categorys-list">
                <CategoryElement
                  category={"Estrategia digital:"}
                  text={"Evalúa si la empresa tiene una estrategia clara y coherente para la transformación digital, si la estrategia está alineada con los objetivos de negocio y si se están tomando medidas para implementar la estrategia."}
                />
                <CategoryElement
                  category={"Cultura digital:"}
                  text={"Evalúa si la empresa tiene una cultura digital sólida y una mentalidad de innovación, si los empleados están comprometidos con la transformación digital y si la empresa está promoviendo la colaboración y el aprendizaje continuo."}
                />
                <CategoryElement
                  category={"Capacidades digitales:"}
                  text={"Evalúa si la empresa tiene las habilidades y el talento necesarios para llevar a cabo la transformación digital, si se están invirtiendo en la formación y el desarrollo de los empleados y si la empresa tiene una estructura organizativa adecuada para la transformación digital."}
                />
                <CategoryElement
                  category={"Experiencia del cliente:"}
                  text={"Evalúa si la empresa está utilizando la tecnología para mejorar la experiencia del cliente, si se están adoptando nuevas tecnologías para mejorar la interacción con los clientes y si se están midiendo los resultados y tomando medidas para mejorar continuamente."} />
              </ul>
            </section>
          </section>

          <section className="categorys">
            <ul className="categorys-list">
              <CategoryElement
                category={"Innovación y colaboración:"}
                text={"Evalúa si la empresa está fomentando la innovación y la colaboración, si se están implementando prácticas ágiles para el desarrollo de productos y servicios, si se están adoptando nuevas tecnologías y si se están explorando nuevas formas de colaboración con socios y proveedores."}
              />
              <CategoryElement
                category={"Gobierno digital:"}
                text={"Evalúa si la empresa tiene una estructura de gobierno adecuada para la transformación digital, si se están estableciendo políticas y normas claras para el uso de la tecnología y si se están tomando medidas para mitigar los riesgos asociados con la transformación digital"} />
              <CategoryElement
                category={"Tecnologías digitales emergentes:"}
                text={"Evalúa si la empresa está adoptando tecnologías emergentes como la inteligencia artificial, la nube, el blockchain y la robótica, si se están explorando nuevas oportunidades de negocio y si se están preparando para los desafíos que pueden presentarse."} />
              <CategoryElement
                category={"Resultados de negocio:"}
                text={"Evalúa si la empresa está logrando resultados positivos a través de la transformación digital, si se están midiendo los resultados y si se están tomando medidas para mejorar continuamente."} />
            </ul>
            <div className="conclusion-container">
              <p>
                Al evaluar estas dimensiones, nuestra herramienta proporciona una imagen completa del nivel de madurez digital de la empresa y ayuda a identificar las áreas en las que se pueden realizar mejoras. Esperamos que esta herramienta sea útil para todas las empresas que estén interesadas en mejorar su capacidad de transformación digital.
              </p>
            </div>
          </section>
        </div>

        <div className="options">
          <div className="options-title">
            <h4>Explora entre</h4>
            <h2>nuestras opciones</h2>
          </div>
          <hr className="options-line" />
        </div>

        <section className="services-container">
          <Services
            classCard={'service-image bg-1'}
            classText={'service-type hov-b'}
            text={'medianas y grandes empresas'}
          />
          <Services
            classCard={'service-image bg-2'}
            classText={'service-type hov-b'}
            text={'micros y pequeñas empresas'}
          />
          <Services
            classCard={'service-image bg-3'}
            classText={'service-type hov-g'}
            text={'economía popular, asociativa y comunitaria'}
          />
          <Services
            classCard={'service-image bg-4'}
            classText={'service-type hov-aq'}
            text={'excelencia clínica'}
          />
        </section>

        <div className="more-information-container">
          <a href="https://www.ccc.org.co/" className="more-information">
            <span className="more-information-text">
              conoce más sobre cámara de comercio de cali
            </span><TransitionRightSolid />
          </a>
        </div>
      </div>
    </main>
  );
}

export default MainContent;