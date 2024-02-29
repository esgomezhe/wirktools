import React from "react";
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav id="navbar" className="navbar">
      <ul>
        <li><Link className="active" to='/' > Home</Link></li>
        <li><Link to='/formulario' > Formulario</Link></li>
        <li><Link to='/about' > About</Link></li>
        <li><Link to='/services' > Services</Link></li>
        <li><Link to='/portfolio' > Portfolio</Link></li>
        <li><Link to='/team' > Team</Link></li>
        <li><Link to='/blog' > Blog</Link></li>
        <li className="dropdown"><Link to='#' > <span>Drop Down</span><i className="bi bi-chevron-down"></i></Link>
          <ul>
            <li><Link to='#' >Drop Down 1</Link></li>
            <li className="dropdown"><Link to='#' ><span>Deep Drop Down</span><i className="bi bi-chevron-right"></i></Link>
              <ul>
                <li><Link to='#' >Deep Drop Down 1</Link></li>
                <li><Link to='#' >Deep Drop Down 2</Link></li>
                <li><Link to='#' >Deep Drop Down 3</Link></li>
                <li><Link to='#' >Deep Drop Down 4</Link></li>
                <li><Link to='#' >Deep Drop Down 5</Link></li>
              </ul>
            </li>
            <li><Link to='#' >Drop Down 2</Link></li>
            <li><Link to='#' >Drop Down 3</Link></li>
            <li><Link to='#' >Drop Down 4</Link></li>
          </ul>
        </li>
        <li><Link to='/contact' > Contact Us</Link></li>
      </ul>
      <i className="bi bi-list mobile-nav-toggle"></i>
    </nav>
  );
}

export default Navbar;