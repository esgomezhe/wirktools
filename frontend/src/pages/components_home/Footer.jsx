import { Link } from 'react-router-dom'
import '../stylesheets/footer.css'
import { FacebookTag, Twitter, Instagram, Linkedin, Youtube, Facebook } from 'iconoir-react'

function Footer() {
  return (
    <>
      <div className='footer-divider'></div>
      <footer className='footer'>
        <div className='footer-container'>

          <div className='footer-direction'>
            <p>Cámara de Comercio de Cali <br />
              NIT: 890399001-1</p>
            <p>Calle 8 No. 3 - 14<br />
              Cali, Valle, Colombia</p>
          </div>

          <div className='footer-contact'>
            <p><span className='footer-contact--span'>call center:</span> +57 (602) 8861300</p>
            <p><span className='footer-contact--span'>Email:</span> transformatedigital@ccc.org.co</p>
            <p><span className='footer-contact--span'>notificaciones judiciales:<br /></span>notificacionesjudiciales@ccc.org.co</p>
          </div>

          <div className='footer-options'>
            <span className='footer-options--span'>mapa del sitio:</span>
            <Link to='#' className='footer-options--link'>home</Link>
            <Link to='#' className='footer-options--link'>medianas y grandes empresas</Link>
            <Link to='#' className='footer-options--link'>micro y pequeñas empresas</Link>
            <Link to='#' className='footer-options--link'>economía popular, asociativa y <br />comunitaria</Link>
          </div>

          <div className='footer-logos'>
            <span className='footer-logos--span'>desarrollada por:</span>

            <div className='logos-container'>

              <div className='footer-logo'>
                <img src='https://transformaciondigital.com.co/wp-content/uploads/elementor/thumbs/Logo2-ccc-q57m600qhx4su0vzxmpowyp54y4yku0xliok109wtw.png' alt='logo ccc' width={50} />
                <span>cámara de comercio de cali</span>
              </div>

              <div className='footer-logo'>
                <img src='https://transformaciondigital.com.co/wp-content/uploads/elementor/thumbs/GVd2c7Pj_2x-q57n0u44p9cfpi3ivgk37okip05g3dfxi54zssjypg.png' width={50} alt='logo ccc' />
                <span>wirk consulting SAS</span>
              </div>
            </div>
          </div>
        </div>

        <div className='footer-socialmedia'>
          <span>Síguenos en: </span>
          <div className='socialmedia-links'>
            <a href="#" className='social-link'><Facebook /></a>
            <a href="#" className='social-link'><Twitter /></a>
            <a href="#" className='social-link'><Youtube /></a>
            <a href="#" className='social-link'><Instagram /></a>
            <a href="#" className='social-link'><Linkedin /></a>
          </div>
          <p>Wirk Consulting © 2023. Todos los derechos reservados</p>
        </div>
      </footer>
    </>
  )
}

export default Footer