import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from './Navbar';

function Header() {
  const location = useLocation();
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 || location.pathname !== '/') {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };

    // Initial scroll check on load
    handleScroll();

    // Event listeners
    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // si se está en la home "/" entonces el header sera fixed-top de lo contrario se quitará la clase
  const headerClass = `header-transparent d-flex align-items-center${headerScrolled ? ' header-scrolled' : ''} ${location.pathname === '/' ? 'fixed-top' : ''}`;

  return (
    <header id="header" className={headerClass}>
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo">
          <h1 className="text-light">
            <Link to={"/"}>
              <span>Wirk Tools</span>
            </Link>
          </h1>
        </div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
