import React from "react";
import Navbar from './Navbar'
import { Link } from "react-router-dom";

function Header() {
  return (

    <header id="header" className=" d-flex align-items-center">
      {/* fixed-top --agregar despues
        header-transparent */}
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo">
          <h1 className="text-light"><Link to={"/"}
          ><span>Wirk Tools</span></Link></h1>
        </div>
        <Navbar />
      </div>
    </header >
  );
}

export default Header;