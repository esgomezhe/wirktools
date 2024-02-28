import React from "react";
import Features from '../img/features-1.svg'
import Features2 from '../img/features-2.svg'
import Features3 from '../img/features-3.svg'
import Features4 from '../img/features-4.svg'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function FeacturesSection() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section className="features">
      <div className="container">

        <div className="section-title">
          <h2>Conoce nuestras características</h2>
          <p>Descubre nuestro ecosistema de crecimiento: un Marketplace diverso, cursos enriquecedores, autodiagnósticos clarificadores y un sistema de mentorías personalizadas,
            todo diseñado para impulsar tu crecimiento empresarial y profesional en un solo lugar.</p>
        </div>

        <div className="row" data-aos="fade-up">
          <div className="col-md-5">
            <img src={Features} className="img-fluid" />
          </div>

          <div className="col-md-7 pt-4">
            <h3>Sistema de Gestión de Aprendizaje</h3>
            <p className="fst-italic">
              Descubre un camino de aprendizaje adaptado a tus necesidades con nuestro sistema de gestión. Avanza a tu propio ritmo y profundiza en las áreas que más te interesan.
            </p>
            <ul>
              <li><i className="bi bi-check"></i> Cursos personalizados para una educación a medida.</li>
              <li><i className="bi bi-check"></i> Seguimiento y evaluación continua para garantizar tu progreso.</li>
            </ul>
          </div>
        </div>

        <div className="row" data-aos="fade-up">
          <div className="col-md-5 order-1 order-md-2">
            <img src={Features2} className="img-fluid" alt="" />
          </div>
          <div className="col-md-7 pt-5 order-2 order-md-1">
            <h3>Herramienta de Autodiagnóstico</h3>
            <p className="fst-italic">
              Utiliza nuestra herramienta de autodiagnóstico para entender mejor las fortalezas y oportunidades de tu empresa en el mundo digital.
            </p>
            <p>
              Recibe recomendaciones prácticas para mejorar y digitalizar tus procesos de negocio, aumentando tu competitividad en el mercado.
            </p>
          </div>
        </div>

        <div className="row" data-aos="fade-up">
          <div className="col-md-5">
            <img src={Features3} className="img-fluid" alt="" />
          </div>
          <div className="col-md-7 pt-5">
            <h3>Marketplace</h3>
            <p>Explora nuestro Marketplace y conecta con una comunidad diversa de negocios y consumidores. Encuentra oportunidades únicas para crecer y expandir tu alcance.</p>
            <ul>
              <li><i className="bi bi-check"></i> Amplia visibilidad para tus productos y servicios.</li>
              <li><i className="bi bi-check"></i> Interacción directa con clientes y socios potenciales.</li>
              <li><i className="bi bi-check"></i> Transacciones seguras y confiables.</li>
            </ul>
          </div>
        </div>

        <div className="row" data-aos="fade-up">
          <div className="col-md-5 order-1 order-md-2">
            <img src={Features4} className="img-fluid" alt="" />
          </div>
          <div className="col-md-7 pt-5 order-2 order-md-1">
            <h3>Agendamiento de mentorías</h3>
            <p className="fst-italic">
              Accede a nuestra plataforma de mentorías para recibir guía y asesoramiento de expertos. Fomenta tu desarrollo profesional con la experiencia y
              conocimiento de líderes en la industria.
            </p>
            <p>
              Planifica sesiones que se adapten a tus objetivos y necesidades, y da el próximo paso en tu carrera con confianza.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeacturesSection;