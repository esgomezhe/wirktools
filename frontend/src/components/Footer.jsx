import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const FooterLink = ({ iconClass, text, href }) => (
  <li><i className={iconClass}></i> <a href={href}>{text}</a></li>
);

function Footer() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <footer id="footer" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">

      <div className="footer-newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h4>Nuestro Newsletter</h4>
              <p>Suscríbete a nuestro Newsletter para obtener las actualizaciones de nuestras herramientas y ofertas exclusivas</p>
            </div>
            <div className="col-lg-6">
              <form action="" method="post">
                <input type="email" name="email" /><input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-top">
        <div className="container">
          <div className="row">

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Mapa del Sitio</h4>
              <ul>
                <FooterLink iconClass="bx bx-chevron-right" text="Home" href="#" />
                <FooterLink iconClass="bx bx-chevron-right" text="About us" href="#" />
                <FooterLink iconClass="bx bx-chevron-right" text="Services" href="#" />
                <FooterLink iconClass="bx bx-chevron-right" text="Terms of service" href="#" />
                <FooterLink iconClass="bx bx-chevron-right" text="Privacy policy" href="#" />
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Nuestras Herramientas</h4>
              <ul>
                <FooterLink iconClass="bx bx-chevron-right" text="Autodiagnóstico" href="#" />
                <FooterLink iconClass="bx bx-chevron-right" text="Marketplace" href="#" />
                <FooterLink iconClass="bx bx-chevron-right" text="Mentorías" href="#" />
                <FooterLink iconClass="bx bx-chevron-right" text="Cursos Virtuales" href="#" />
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-contact">
              <h4>Contact Us</h4>
              <p>
                A108 Adam Street <br />
                New York, NY 535022<br />
                United States <br /><br />
                <strong>Phone:</strong> +1 5589 55488 55<br />
                <strong>Email:</strong> 0jS0K@example.com<br />
              </p>
            </div>

            <div className="col-lg-3 col-md-6 footer-info">
              <h3>Acerca de Wirk Consulting SAS</h3>
              <p>
                Somos una firma de consultoría que genera valor y confianza a sus clientes y aporta a las organizaciones conocimiento y experiencia para llevarte al siguiente nivel
              </p>
              <div className="social-links mt-3">
                <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>Wirk Consulting SAS</span></strong>. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
