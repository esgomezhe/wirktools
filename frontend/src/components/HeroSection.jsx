import React from "react";
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <>
      <section id="hero" className="d-flex justify-cntent-center align-items-center">
        <div id="heroCarousel" className="container carousel carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">

          {/* Slide 1 */}

          <div className="carousel-item active">
            <div className="carousel-container">
              <h2 className="animate__animated animate__fadeInDown">Welcome to <span>Wirk Tools</span></h2>
              <p className="animate__animated animate__fadeInUp">Estamos emocionados de darles la bienvenida a este espacio dedicado a impulsar y destacar sus empresas. Aquí, podrán mostrar al mundo lo mejor de sus servicios y productos, conectándose con aquellos que buscan exactamente lo que ustedes ofrecen.</p>
              <Link to='' className="btn-get-started animate__animated animate__fadeInUp">Aprende más</Link>
            </div>
          </div>

          {/* Slide 2 */}

          <div className="carousel-item">
            <div className="carousel-container">
              <h2 className="animate__animated animate__fadeInDown">Herramienta de Autodiagnóstico</h2>
              <p className="animate__animated animate__fadeInUp">Bienvenidos a nuestra herramienta de autodiagnóstico del nivel de madurez en la transformación digital desarrollada por la Cámara de Comercio de Cali y Wirk Consulting SAS. Esta herramienta está diseñada para ayudar a las empresas a evaluar su nivel de madurez digital en diferentes áreas clave, y proporcionar recomendaciones para mejorar su capacidad de transformación digital.</p>
              <Link to='' className="btn-get-started animate__animated animate__fadeInUp">Aprende más</Link>
            </div>
          </div>

          {/* Slide 3 */}

          <div className="carousel-item">
            <div className="carousel-container">
              <h2 className="animate__animated animate__fadeInDown">Marketplace</h2>
              <p className="animate__animated animate__fadeInUp">En nuestro Marketplace, damos la bienvenida a empresas de todos los sectores y tamaños. Creemos en la diversidad y la riqueza que aporta la variedad de servicios y productos. Ya seas una pequeña empresa local, una start-up innovadora o una empresa consolidada, este es el lugar para ti..</p>

              <Link to='' className="btn-get-started animate__animated animate__fadeInUp">Aprende más</Link>
            </div>
          </div>

          <a className="carousel-control-prev"
            href="#heroCarousel" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bx bx-chevron-left" aria-hidden="true"></span>
          </a>

          <a className="carousel-control-next"
            href="#heroCarousel" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon bx bx-chevron-right" aria-hidden="true"></span>
          </a>
        </div>
      </section> {/* End Hero */}
    </>
  );
}

export default HeroSection;