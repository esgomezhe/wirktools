import React from 'react'
import '../../stylesheets/newHome/footerHome.css'
import { Facebook, Instagram, Linkedin, X, Youtube } from 'iconoir-react';
import CallCenter from '../../img/call_footer.svg'
import Email from '../../img/email_footer.svg'
import EmailJudicial from '../../img/email2_footer.svg'


function FooterHome() {
  return (
    <>
      <footer className='footer'>
        <div className="footer__content">
          <div className='footer__content--container'>
            <div className="footer__section">
              <div className='footer__logos'>
                <img src={require('../../img/logo.jpg')} alt="camara de comercio cali logo" height={40} />
                <div className="footer_logos--wirk">
                  <span className='wirk--span'>Con el apoyo de:</span>
                  <img src={require('../../img/wirk_logo.jpg')} alt="wirkconsulting logo" height={37} />
                </div>
              </div>

              <div className='footer__direction'>
                <span className='footer__direction--span'>cámara de comercio de cali</span>
                <p className='footer__direction--text'>NIT: 890399001-1</p>
                <p className='footer__direction--text'>Calle 8 No. 3 - 14</p>
                <p className='footer__direction--text'>Cali, valle, colombia</p>
              </div>
            </div>

            <div className='footer__contact'>
              <div className='footer__contact--text'>
                <img src={CallCenter} width={15} alt='call center' />
                <div className='contact--text-container'>
                  <span className='footer__contact--span'> call center: </span>
                  <a href="tel:(602)8861300" className='footer__contact--link'>+57 (602) 8861300</a>
                </div>
              </div>

              <div className='footer__contact--text'>
                <img src={Email} width={15} alt='email' />
                <div className='contact--text-container'>
                  <span className='footer__contact--span'> email: </span>
                  <a href="mailto:transformatedigital@ccc.org.co" className='footer__contact--link' >transformatedigital@ccc.org.co</a>
                </div>
              </div>

              <div className='footer__contact--text'>
                <img src={EmailJudicial} width={15} alt='notification email' />
                <div className='contact--text-container'>
                  <span className='footer__contact--span'> Notificaciones judiciales: </span>
                  <a href="mailto:notificacionesjudiciales@ccc.org.co" className='footer__contact--link'>notificacionesjudiciales@ccc.org.co</a>
                </div>
              </div>
            </div>

            <div className="footer__tools">
              <span className='footer__tools--span'>Autodiagnósticos disponibles</span>
              <p className='footer__tools--text'>Medianas y grandes empresas</p>
              <p className='footer__tools--text'>Micros y pequeñas empresas</p>
              <p className='footer__tools--text'>Economía popular, asociativa y comunitaria</p>
              <p className='footer__tools--text'>Excelencia clínica</p>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer__socialmedia">
        <div className="footer__socialmedia--container">
          <div className="footer__socialmedia--links">
            <a href="https://www.facebook.com/CamaraComercioCali" className='social--link' target='_blank' rel="noreferrer"><Facebook /></a>
            <a href="https://twitter.com/camaracali" className='social--link' target='_blank' rel="noreferrer"><X /></a>
            <a href="https://www.youtube.com/user/camaradecomerciocali" className='social--link' target='_blank' rel="noreferrer"><Youtube /></a>
            <a href="https://www.instagram.com/camaracali/" className='social--link' target='_blank' rel="noreferrer"><Linkedin /></a>
            <a href="https://www.linkedin.com/company/camara-de-comercio-de-cali/" className='social--link' target='_blank' rel="noreferrer"><Instagram /></a>
          </div>
          <p className='footer__socialmedia--text'>© 2024. Todos los derechos reservados</p>
        </div>
      </div>
    </>
  )
}

export default FooterHome