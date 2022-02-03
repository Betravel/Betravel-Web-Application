import React from "react";
import Logo from "../assets/betravellogo.jpg";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';


function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} alt="" />
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/profil"> Profil </Link>
      </div>
    </div>
  );
}

export default Navbar;
