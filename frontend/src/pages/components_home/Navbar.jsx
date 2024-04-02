import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/navbar.css";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="navbar-container">
      <ul className="navbar-menu">
        <li className="navbar-item active">
          <Link to="/" className="navbar-link active">
            home
          </Link>
        </li>

        <li
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
          className="navbar-item"
        >
          <div className="navbar-dropdown">
            <span className="navbar-link">herramienta de autodiagnóstico <i className="bi bi-chevron-down" /></span>
            <div className={`dropdown-content ${openDropdown === 1 ? 'open' : ''}`}>
              <Link to="/formularioMicro" className="dropdown-item">
                micros y pequeñas empresas
              </Link>
              <Link to="/formularioUnidades" className="dropdown-item">
                unidades de negocio productivo
              </Link>
            </div>
          </div>
        </li>

        <li
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
          className="navbar-item"
        >
          { /*
          <div className="navbar-dropdown">
            <span className="navbar-link">iniciativa cluster <i className="bi bi-chevron-down" /></span>
            <div className={`dropdown-content ${openDropdown === 2 ? 'open' : ''}`}>
              <Link to="#" className="dropdown-item">
                formulario de caracterizacion
              </Link>
            </div>
          </div>
          */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
