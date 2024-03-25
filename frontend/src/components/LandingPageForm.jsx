import React from "react";
import "../stylesheets/landingpageform.css";
import { Link } from "react-router-dom";

function LandingPageForm() {
  return (
    <div className="cards-container">
      <div className="cards">

        <Link to={"/formularioQ"} className="card">
          <h3>Formulario</h3>
        </Link>

        <Link to={"/formularioQ"} className="card">
          <h3>Formulario</h3>
        </Link>

        <Link to={"/formularioQ"} className="card">
          <h3>Formulario</h3>
        </Link>

        <Link to={"/formularioQ"} className="card">
          <h3>Formulario</h3>
        </Link>
      </div>

    </div>
  );
}

export default LandingPageForm;