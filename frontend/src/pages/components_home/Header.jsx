import React from "react";
import "../stylesheets/header.css";
import Navbar from "./Navbar";

function Header() {
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <img className="header-image" src="https://transformaciondigital.com.co/wp-content/uploads/2023/03/Logo-ccc-1-e1696351300230.png" alt="Camara de comercio de cali" />

            <img className="header-image" src="https://transformaciondigital.com.co/wp-content/uploads/2023/03/Logo.png" alt="wirk consulting" />
          </div>

          <Navbar />
        </div>
      </header>
    </>
  );
}

export default Header;