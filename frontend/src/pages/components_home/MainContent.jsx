import React from "react";
import "../stylesheets/main.css";
import { CheckCircleSolid, TransitionRightSolid } from "iconoir-react"

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

                <li className="categorys-list-element">
                  <span className="checkbox"><CheckCircleSolid color="#F2661F" /></span>
                  <p> <span className="checkbox">Estrategia digital:</span> Evalúa si la empresa tiene una estrategia clara y coherente para la transformación digital, si la estrategia está alineada con los objetivos de negocio y si se están tomando medidas para implementar la estrategia.</p>
                </li>

                <li className="categorys-list-element">
                  <span className="checkbox"><CheckCircleSolid color="#F2661F" /></span>
                  <p> <span>Cultura digital:</span> Evalúa si la empresa tiene una cultura digital sólida y una mentalidad de innovación, si los empleados están comprometidos con la transformación digital y si la empresa está promoviendo la colaboración y el aprendizaje continuo.</p>
                </li>

                <li className="categorys-list-element" >
                  <span className="checkbox"><CheckCircleSolid color="#F2661F" /></span>
                  <p> <span>Capacidades digitales:</span> Evalúa si la empresa tiene las habilidades y el talento necesarios para llevar a cabo la transformación digital, si se están invirtiendo en la formación y el desarrollo de los empleados y si la empresa tiene una estructura organizativa adecuada para la transformación digital.</p>
                </li>

                <li className="categorys-list-element">
                  <span className="checkbox"><CheckCircleSolid color="#F2661F" /></span>
                  <p> <span>Experiencia del cliente:</span> Evalúa si la empresa está utilizando la tecnología para mejorar la experiencia del cliente, si se están adoptando nuevas tecnologías para mejorar la interacción con los clientes y si se están midiendo los resultados y tomando medidas para mejorar continuamente.</p>
                </li>
              </ul>
            </section>
          </section>

          <section className="categorys">
            <ul className="categorys-list">
              <li className="categorys-list-element">
                <span className="checkbox"><CheckCircleSolid color="#F2661F" /></span>
                <p> <span>Innovación y colaboración:</span>  Evalúa si la empresa está fomentando la innovación y la colaboración, si se están implementando prácticas ágiles para el desarrollo de productos y servicios, si se están adoptando nuevas tecnologías y si se están explorando nuevas formas de colaboración con socios y proveedores.</p>
              </li>

              <li className="categorys-list-element">
                <span className="checkbox"><CheckCircleSolid color="#F2661F" /></span>
                <p> <span>Gobierno digital:</span> Evalúa si la empresa tiene una estructura de gobierno adecuada para la transformación digital, si se están estableciendo políticas y normas claras para el uso de la tecnología y si se están tomando medidas para mitigar los riesgos asociados con la transformación digital</p>
              </li>

              <li className="categorys-list-element">
                <span className="checkbox"><CheckCircleSolid color="#F2661F" /></span>
                <p> <span>Tecnologías digitales emergentes:</span> Evalúa si la empresa está adoptando tecnologías emergentes como la inteligencia artificial, la nube, el blockchain y la robótica, si se están explorando nuevas oportunidades de negocio y si se están preparando para los desafíos que pueden presentarse.</p>
              </li>

              <li className="categorys-list-element" >
                <span className="checkbox"><CheckCircleSolid color="#F2661F" /></span>
                <p> <span>Resultados de negocio:</span> Evalúa si la empresa está logrando resultados positivos a través de la transformación digital, si se están midiendo los resultados y si se están tomando medidas para mejorar continuamente.</p>
              </li>
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

          <a href="#" className="service">

            <div
              className="service-image bg-1">
              <div className="overlay"></div>
            </div>
            <div className="service-type hov-b">
              <h4>Medianas y grandes empresas</h4>
            </div>

          </a>

          <a href="#" className="service">
            <div
              className="service-image bg-2">
              <div className="overlay"></div>
            </div>
            <div className="service-type hov-b">
              <h4>micros y pequeñas empresas</h4>
            </div>
          </a>

          <a href="#" className="service">
            <div
              className="service-image bg-3">
              <div className="overlay"></div>
            </div>
            <div className="service-type hov-g">
              <h4>economía popular, asociativa y comunitaria</h4>
            </div>
          </a>

          <a href="#" className="service">
            <div
              className="service-image bg-4">
              <div className="overlay"></div>
            </div>
            <div className="service-type hov-aq">
              <h4>excelencia clínica</h4>
            </div>
          </a>
        </section>

        <div className="more-information-container">
          <a href="#" className="more-information">
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


