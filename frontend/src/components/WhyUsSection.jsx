import React from "react";
import WhyUs from '../img/why-us.jpg'


function WhyUsSection() {
  return (
    <section className="why-us section-bg" data-aos-delay="200">
      <div className="container">

        <div className="row">
          <div className="col-lg-6 video-box" >
            <img src={WhyUs} className="img-fluid" alt="" />
            <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
          </div>

          <div className="col-lg-6 d-flex flex-column justify-content-center p-5">

            <div className="icon-box">
              <div className="icon"><i className="bx bx-fingerprint"></i>
              </div>
              <h4 className="title">
                <a href="">Crecimiento empresarial</a>
              </h4>
              <p className="description">En la era digital, el crecimiento empresarial y profesional se acelera a un ritmo sin precedentes.
                La tecnología ofrece una plataforma para la innovación continua y la adaptabilidad, permitiendo a las empresas y a los profesionales expandir sus horizontes y
                alcanzar nuevas alturas. Con las herramientas digitales adecuadas, la colaboración global y el aprendizaje constante se convierten en la norma, y las posibilidades
                de éxito son tan ilimitadas como nuestra capacidad para imaginar y ejecutar nuevas ideas.</p>
            </div>

            <div className="icon-box">
              <div className="icon"><i className="bx bx-gift"></i>
              </div>
              <h4 className="title">
                <a href="">Empieza tu prueba en nuestras herramientas</a>
              </h4>
              <p className="description">Dale un impulso a tu trayectoria con solo un clic. Empieza tu prueba en nuestras herramientas y abre la puerta a un mundo de oportunidades
                digitales. Descubre cómo nuestra tecnología puntera puede transformar tu crecimiento empresarial y profesional hoy.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUsSection;