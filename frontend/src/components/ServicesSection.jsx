import React from "react";
import { Link } from 'react-router-dom'

function ServicesSection() {
  return (
    <section className="services">
      <div className="container">

        <div className="row">
          <div className="col-md-6 col-lg-3 d-flex align-items-stretch aos-init aos-animate" data-aos="fade-up">
            <div className="icon-box icon-box-pink">
              <div className="icon"><i className="bx bxl-dribbble"></i></div>
              <h4 className="title"><Link to="">Marketplace</Link></h4>
              <p className="description">Explora nuestro Mercado, un espacio vibrante donde puedes descubrir una amplia variedad de productos y servicios diseñados para enriquecer tu experiencia. Aquí, la calidad se encuentra con la conveniencia en una plataforma que celebra la diversidad y la innovación.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch aos-init aos-animate" data-aos="fade-up"
            data-aos-delay="100">
            <div className="icon-box icon-box-cyan">
              <div className="icon"><i className="bx bx-file"></i></div>
              <h4 className="title"><Link to="">Nuestros Cursos</Link></h4>
              <p className="description">Sumérgete en el aprendizaje con nuestra ección de cursos. Cada uno está diseñado para impulsarte hacia adelante en tu viaje educativo, ofreciendo conocimientos profundos y habilidades prácticas en una variedad de temas y disciplinas.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
            <div className="icon-box icon-box-green">
              <div className="icon"><i class="bx bx-tachometer"></i></div>
              <h4 className="title"><Link to="">Autodiagnóstico</Link></h4>
              <p className="description">Nuestra herramienta de Autodiagnóstico está diseñada para proporcionarte una evaluación rápida y personalizada. Descubre puntos fuertes, áreas para mejorar y recibe recomendaciones personalizadas para tu empresa.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
            <div className="icon-box icon-box-blue">
              <div className="icon"><i class="bx bx-world"></i></div>
              <h4 className="title"><Link href="">Mentorias</Link></h4>
              <p className="description">Con nuestro sistema de agendamiento de mentorías, te conectamos con líderes y profesionales de la industria para sesiones personalizadas. Es la oportunidad perfecta para recibir orientación, resolver dudas y planificar tu camino al éxito con el apoyo de expertos.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;